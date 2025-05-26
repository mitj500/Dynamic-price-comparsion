import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { UserContext } from '../App'
import './components-css/SearchItem.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { storeInSession } from './Session.jsx';

export default function SearchItem(props) {
  const { theme, toggleTheme } = useContext(UserContext)

  const [isSaved, setIsSaved] = useState(false);

  const { userAuth, userAuth: { access_token, username, profile_img, saves }, setUserAuth } = useContext(UserContext)

  useEffect(() => {
    // console.log(props.name)
    if (isSaved) {
      console.log(props.name + " -> issaved")
    }
    else {
      console.log(props.name + " -> NOTSAVED")
    }
    // Check if the current product is saved by the user
    console.log(props.link)
    if (access_token && saves && saves.saveName) {
      setIsSaved(saves.saveName.includes(props.name));
    }
  }, [userAuth.saves, props.name]);

  const handleSave = async (e, nameProp, nameLink) => {
    e.preventDefault();
    console.log(props.name); // Output: example string with slashes and backslashes

    console.log(`/product/${props.name}?name=${props.name}&image=${props.image}&price=${props.price}&stars=${props.stars}&link=${props.link}&ratings=${props.ratings}`);
    let linkProp = `/product/${props.name}?name=${props.name}&image=${props.image}&price=${props.price}&stars=${props.stars}&link=${props.link}&ratings=${props.ratings}`


    console.log(username)
    console.log(access_token)
    console.log(profile_img)

    const saveData = {
      saveName: nameProp,
      saveLink: nameLink,
      link: linkProp,
      username: username
    };

    if (access_token) {
      if (!isSaved) {
        axios.post("http://localhost:3030/save-link", saveData)
          .then(({ data }) => {
            if (data.error) {
              console.log("already there")
            }
            else {
              console.log("updated")
              setUserAuth(data);
              storeInSession("user", JSON.stringify(data))
              setUserAuth(data)
              console.log(sessionStorage.user)
              return
            }

          })
          .catch(({ response }) => {
            return toast.error(response.data.error)
          })
      }
      else if (isSaved) {
        axios.post("http://localhost:3030/delete-link", saveData)
          .then(({ data }) => {
            if (data.error) {
              console.log("already there")
            }
            else {
              console.log("deleted")
              setUserAuth(data);
              storeInSession("user", JSON.stringify(data))
              setUserAuth(data)
              console.log(sessionStorage.user)
              return
            }

          })
          .catch(({ response }) => {
            return toast.error(response.data.error)
          })
      }
    }

    else {
      return toast.error("Sign in to Save this product")
    }


  }

  return (
    <div className='SearchItemProduct'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <Link
        className='link'
        to={{
          pathname: `/product/${encodeURIComponent(props.name)}`,
          search: `?name=${encodeURIComponent(props.name)}&image=${encodeURIComponent(props.image)}&price=${encodeURIComponent(props.price)}&stars=${encodeURIComponent(props.stars)}&link=${encodeURIComponent(props.link)}&ratings=${encodeURIComponent(props.ratings)}`
        }}
      >

        <div className={theme==='light'? 'img-content' : 'img-content img-content-dark'}>
          <img src={props.image} alt="image" />
        </div>
        <div className={theme==='light'? 'txt-content' : 'txt-content txt-content-dark'}>
          <div className="name">{props.name}</div>
          <div className={theme==='light'? 'price' : 'price price-dark'}><i class="fa-solid fa-indian-rupee-sign"></i>{props.price}</div>
          <div className="multi-panel">
            <div className={theme==='light'? 'stars' : 'stars stars-dark'}><span class="staricon material-symbols-outlined">
              star
            </span>{String(props.stars).substring(0, 4) + "/" + String(props.stars).substring(10, 12)} &bull; {props.ratings} </div>
            <button onClick={(e) => handleSave(e, props.name, props.link)}> {saves && saves.saveName.includes(props.name) ? <i class="fa-solid fa-bookmark savebtn"></i> : <i class="fa-regular fa-bookmark savebtn"></i>}</button>
          </div>

        </div>
      </Link>
    </div>
  )
}
