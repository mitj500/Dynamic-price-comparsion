const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv/config')
const bcrypt = require('bcryptjs')
const User = require('./Schema/User.js')
const app = express()
const port = 3030
const cors = require('cors');
const startAmazon = require('./ListOfSearchTerm.js');
const flipkartData = require('./flipkart.js');
const JM = require('./ebay.js');
const VSData = require('./VijaySales.js');
const shortid = require('shortid');
const jwt = require('jsonwebtoken')
const admin = require('firebase-admin')
const serviceAccountKey = require('./price-comparison-cade1-firebase-adminsdk-7m2ib-04b084e93c.json')
const { getAuth } = require("firebase-admin/auth")

app.use(cors());
app.use(express.json());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true
})

const formatDatatoSend = (user) => {

  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    name: user.personal_info.name,
    saves: user.saves
  }
}

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  let isUsernameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result)

  isUsernameNotUnique ? username += shortid.generate() : "";

  return username
}

app.post("/signup", (req, res) => {
  let { name, email, password } = req.body;

  if (name.length < 3) {
    return res.status(403).json({ 'error': 'Name must be at least 3 letters.' })
  }

  if (!email.length) {
    return res.status(403).json({ 'error': 'Enter an Email.' })
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ 'error': 'Email is invalid.' })
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({ 'error': "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter" })
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {

    let username = await generateUsername(email);

    let user = new User({
      personal_info: { name, email, password: hashed_password, username }
    })

    user.save().then((u) => {
      return res.status(200).json(formatDatatoSend(u))
    })
      .catch(err => {

        if (err.code == 11000) {
          return res.status(500).json({ 'error': 'Email already exists.' })
        }
        return res.status(500).json({ 'error': err.message })
      })

  })

})

app.post('/signin', (req, res) => {
  let { email, password } = req.body;

  User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        return res.status(405).json({ error: "email not found" })
      }

      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res.status(403).json({ error: "Error occured while Sign in Please try again" })
        }
        if (!result) {
          return res.status(403).json({ error: "Incorrect Password" })
        } else {
          return res.status(200).json(formatDatatoSend(user))
        }
      })

      console.log(user)
    })
    .catch(err => {
      console.log(err.message)
      return res.status(500).json({ 'error': err.message })
    })
})


app.post("/google-auth", async (req, res) => {
  let { access_token } = req.body

  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser;

      picture = picture.replace("s96-c", "s384-c")

      let user = await User.findOne({ "personal_info.email": email }).select("personal_info.name personal_info.username personal_info.profile_img google_auth").then((u) => {
        return u || null
      })
        .catch(err => {
          return res.status(500).json({ "error": err.message })
        })

      if (user) {
        if (!user.google_auth) {
          return res.status(403).json({ "error": "This email was signed up without Google. Please log in with password to access the account." })
        }
      }
      else {
        let username = await generateUsername(email);

        user = new User({
          personal_info: { name, email, profile_img: picture, username },
          google_auth: true
        })

        await user.save().then((u) => {
          user = u;
        })
          .catch(err => {
            return res.status(500).json({ "error": err.message })
          })
      }

      return res.status(200).json(formatDatatoSend(user))
    })
    .catch(err => {
      return res.status(500).json({ "error": "Failed to authenticate you with Google. Try with some other Google account" })
    })
})

app.post('/get-profile', (req, res) => {
  let { username } = req.body 

  User.findOne({"personal_info.username": username})
  .then(user => {
    return res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    return res.status(200).json({ error: err.message})
  })
})

app.post('/update-username', (req, res) => {
  
  let { username, oldusername } = req.body

  if(username.length < 3) {
    return res.status(403).json({ error: "Username must be at least 3 characters long" })
  }

  User.findOne({ "personal_info.username": oldusername })
  .then((user) => {
    User.findOneAndUpdate({ "personal_info.username": oldusername }, {"personal_info.username": username})
    .then(() => {
      return res.status(200).json({ username })
    })
    .catch(err => {
      if(err.code == 11000) {
        return res.status(409).json({ error: "Username is already taken" })
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "User not found" })
  })
})

app.post('/change-password', (req, res) => {

  let { currentPassword, newPassword, username } = req.body

  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


  if (!passwordRegex.test(currentPassword) || !passwordRegex.test(newPassword)) {
    return res.status(403).json({ error: "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter" })
  }

  User.findOne({ "personal_info.username": username })
  .then((user) => {

    if(user.google_auth) {
      return res.status(403).json({ error: "Cant change account's password because you logged in through Google" })
    }
    bcrypt.compare(currentPassword, user.personal_info.password, (err, result) => {
      if(err) {
        return res.status(500).json({ error: "Some error occured while changing the password, try again later" })

      }

      if(!result) {
        return res.status(403).json({ error: "Incorrect current password" })
      }
      
      bcrypt.hash(newPassword, 10, (err, hashed_password) => {
        User.findOneAndUpdate({ "personal_info.username": username }, {"personal_info.password": hashed_password})
        .then((u) => {
          return res.status(200).json({ status: "password changed"})
        })
        .catch(err => {
          return res.status(500).json({ error: "Some error occured. Please try again later " })
        })
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "User not found" })
  }) 

})

app.post('/save-link', (req, res) => {
  let { username, saveName, saveLink, link } = req.body;

  User.findOne({ "personal_info.username": username })
    .then((user) => {
      if (user) {
        if (user.saves.saveLink.includes(saveLink)) {
          res.status(400).json({ "error": 'Link already saved' });
        } else {
          User.findByIdAndUpdate(user._id, { $push: { 'saves.saveName': saveName, 'saves.saveLink': saveLink, 'saves.link': link } }, { new: true })
            .then(updatedUser => {
              res.status(200).json(formatDatatoSend(updatedUser));
            })
            .catch(error => {
              console.error('Error updating user:', error);
              res.status(500).json({ "error": 'Failed to save link' });
            });
        }
      } else {
        res.status(404).json({ "error": 'User not found' });
      }
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ "error": 'Failed to save link' });
    });
});

app.post('/delete-link', (req, res) => {
  let { username, saveName, saveLink, link } = req.body;

  User.findOne({ "personal_info.username": username })
    .then((user) => {
      if (user) {
        const index = user.saves.saveName.indexOf(saveName);
        if (index !== -1) {
          User.findByIdAndUpdate(user._id, {
            $pull: {
              'saves.saveName': saveName,
              'saves.saveLink': user.saves.saveLink[index],
              'saves.link': user.saves.link[index]
            }
          }, { new: true })
            .then(updatedUser => {
              res.status(200).json(formatDatatoSend(updatedUser));
            })
            .catch(error => {
              console.error('Error updating user:', error);
              res.status(500).json({ "error": 'Failed to save link' });
            });
        } else {
          res.status(400).json({ "error": 'Link not saved' });
        }
      } else {
        res.status(404).json({ "error": 'User not found' });
      }
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ "error": 'Failed to save link' });
    });
});

app.post('/get-links', (req, res) => {
  let { username } = req.body;

  User.findOne({ "personal_info.username": username })
    .then((user) => {
      if (user) {
        if (user.saves) {
          res.status(200).json({ saves: user.saves });
        }
        else {
          res.status(200).json({ "error": "no saves" })
        }
      } else {
        res.status(404).json({ "error": 'User not found' });
      }
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ "error": 'Failed to retrieve saves' });
    });
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/sendData', async (req, res) => {
  try {
    const result = await startAmazon('https://amazon.in/s?k=' + req.body.term);
    res.send(result)
  }
  catch (error) {
    console.log("Error: " + error)
  }
})

app.post('/api/sendFlip', async (req, res) => {
  try {
    const result = await flipkartData('https://flipkart.com/search?q=' + req.body.name);
    res.send(result)
  }
  catch (error) {
    console.log("Error: " + error)
  }
})

app.post('/api/sendVS', async (req, res) => {
  try {
    let nameVS = req.body.name.replace(/[\/\\(),\-\s]+/g, " ").replace(/[']/g, '').replace(/["]/g, "").toLowerCase();
    console.log('https://www.vijaysales.com/search/'+nameVS)
    const result = await VSData('https://www.vijaysales.com/search/' + nameVS);
    res.send(result)
  }
  catch (error) {
    console.log("Error: " + error)
  }
})

app.post('/api/sendJM', async (req, res) => {
  try {
    let nameJM = req.body.name.replace(/[\/\\(),\-\s]+/g, " ").replace(/[']/g, '').replace(/["]/g, "").toLowerCase();
    // console.log('https://www.jiomart.com/search/'+nameVS)
    const result = await JM('https://www.jiomart.com/search/' + nameJM);
    res.send(result)
  }
  catch (error) {
    console.log("Error: " + error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

