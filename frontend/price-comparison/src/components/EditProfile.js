import React, { useState, useRef, useContext } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../App'
import axios from 'axios'
import { useEffect } from 'react';
import './components-css/EditProfile.css'
import { storeInSession } from './Session';

export default function EditProfile() {
  const { theme, toggleTheme } = useContext(UserContext)


    const { userAuth, userAuth: { access_token, username }, setUserAuth } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [usernameVal, setUsernameVal] = useState(userAuth.username);

    const editProfileForm = useRef();

    useEffect(() => {
        if (access_token) {
            axios.post("http://localhost:3030/get-profile", { username: userAuth.username })
                .then(({ data }) => {
                    setProfile(data);
                    setUsernameVal(data.personal_info.username); 
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [access_token, userAuth.username]);

    const handleUsernameChange = (e) => {
        setUsernameVal(e.target.value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        let form = new FormData(editProfileForm.current);

        let formData = {};
        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        let { username } = formData;

        console.log("Email: "+userAuth.username)

        formData['oldusername'] = userAuth.username

        if(username.length < 3) {
            return toast.error("Username should be at least 3 characters long")
        }
        
        console.log("FORM__");
        console.log(formData);

        e.target.setAttribute("disabled", true)

        let loadingToast = toast.loading("Updating")

        axios.post("http://localhost:3030/update-username", formData)
        .then(({ data }) => {
            toast.dismiss(loadingToast)
            console.log(data)
            if(userAuth.username !== data.username) {
                let newUserAuth = { ...userAuth, username: data.username }

                storeInSession("user", JSON.stringify(newUserAuth))
                setUserAuth(newUserAuth)
            }
            e.target.removeAttribute("disabled")
            return toast.success("Username updated")
        })
        .catch(({ response }) => {
            toast.dismiss(loadingToast)

            e.target.removeAttribute("disabled")
            return toast.error(response.data.error)
        })
    };

    return (
        <div className={theme==='light'? 'profile-holder' : 'profile-holder profile-holder-dark'}>
            <form ref={editProfileForm}>
                <Toaster />
                {profile && (
                    <>
                        <div className="content-holder">
                            <div className={theme==='light'? 'profile-img' : 'profile-img profile-img-dark'}>{profile.personal_info.username[0].toUpperCase()}</div>
                        </div>
                        <div className="hello-msg">Hello, {profile.personal_info.name}</div>
                        <div className={theme==='light'? 'nameinp inpbox inp1 gray': 'nameinp inpbox inp1 gray nameinp inpbox-dark inp1'}>
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="name" disabled value={profile.personal_info.name} id="name" placeholder='Name' />
                        </div>
                        <div className={theme==='light'? 'email inpbox gray': 'email gray inpbox inpbox-dark'}>
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" name="email" disabled value={profile.personal_info.email} id="email" placeholder='Email' />
                        </div>
                        <div className={theme==='light'? 'email inpbox ': 'email  inpbox inpbox-dark'}>
                            <i className="fa-solid fa-at"></i>
                            <input type="text" name="username" value={usernameVal} onChange={handleUsernameChange} id="username" placeholder='Username' />
                        </div>
                        <button type='submit' onClick={handleUpdate} className={theme==='light'? 'update ': 'update update-dark'}>Update</button>
                    </>
                )}
            </form>
        </div>
    );
}

