import React, { useState, useRef } from 'react'
import Navbar from './Navbar.js';
import './components-css/Signup.css';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from './Session.jsx';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App.js';
import { authWithGoogle } from './Firebase.js';

export default function Signup() {

    const [passwordVisible, setPasswordVisible] = useState(false);
  const { theme, toggleTheme } = useContext(UserContext)

    

    const auth = useRef();

    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext)

    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(serverRoute, formData)
        .then(({ data }) => {
            storeInSession("user", JSON.stringify(data))
            setUserAuth(data)
            console.log(data)
        })
        .catch(({ response }) => {
            toast.error(response.data.error)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let form = new FormData(auth.current)
        let formData = {}

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        let { name, email, password } = formData

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        if (name.length < 3) {
            return toast.error('Name must be at least 3 letters.' )
        }

        if (!email.length) {
            return toast.error('Enter an Email.')
        }

        if (!emailRegex.test(email)) {
            return toast.error('Email is invalid.')
        }

        if (!passwordRegex.test(password)) {
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter")
        }

        userAuthThroughServer("http://localhost:3030/signup", formData)

    }

    const handleGoogleAuth = (e) => {
        e.preventDefault();
        authWithGoogle().then(user => {
            let serverRoute = "http://localhost:3030/google-auth";

            let formData = {
                access_token: user.accessToken
            }

            userAuthThroughServer(serverRoute, formData)
        })
        .catch(err => {
            toast.error("Trouble logging in through Google")
            return console.log(err)
        })
    }

    return (
        access_token ? 
        <Navigate to="/" />
        :
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <Navbar />
            <Toaster />
            <form ref={auth} action="">
                <div className={theme==='light'? 'signup': 'signup signup-dark'}>
                    <div className={theme==='light'? 'heading': 'heading heading-dark'}>
                        <img src={theme==='light' ? `${process.env.PUBLIC_URL}/imgs/A.png` : `${process.env.PUBLIC_URL}/imgs/A2.png`} alt="logo-img" height="30" />
                        <div className="txt">Join us today</div>
                    </div>
                    
                    <div className={theme==='light'? 'nameinp inpbox inp1': 'nameinp inpbox inp1 nameinp inpbox-dark inp1'}>
                        <i className="fa-solid fa-user"></i>
                        <input type="text" name="name" id="name" placeholder='Name' />
                    </div>
                    <div className={theme==='light'? 'email inpbox': 'email inpbox inpbox-dark'}>
                        <i className="fa-solid fa-envelope"></i>
                        <input type="email" name="email" id="email" placeholder='Email' />
                    </div>
                    <div className={theme==='light'? 'password inpbox': 'password inpbox inpbox-dark'}>
                        <i className="fa-solid fa-key"></i>
                        <input type={
                            passwordVisible ? "text" : "password"
                        } name="password" id="password" placeholder='Password' />
                        <i className={"fa-solid " + (passwordVisible ? " fa-eye" : " fa-eye-slash")} style={{ cursor: "pointer" }} onClick={
                            () => setPasswordVisible(currentVal => !currentVal)
                        }></i>
                    </div>

                    <button type='submit'
                        onClick={handleSubmit}
                        className={theme==='light'? 'signupbtn': 'signupbtn signupbtn-dark'}>Sign up</button>

                    <div className={theme==='light'? 'divider': 'divider divider-dark'}>Or</div>
                    
                    <button className={theme==='light'? 'signwithgoogle': 'signwithgoogle signwithgoogle-dark'} onClick={handleGoogleAuth}>
                        <img src="./imgs/google.png" alt="" height={40} />
                        <div className="googletxt">
                            Continue with Google
                        </div>
                    </button>

                    <div className={theme==='light'? 'redirect': 'redirect redirect-dark'}>
                        Already a member?
                        <a href="/signin">Sign in here</a>
                    </div>
                </div>
            </form>

        </>
    )
}
