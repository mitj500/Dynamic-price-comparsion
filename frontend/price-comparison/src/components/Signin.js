import React, { useState, useRef } from 'react'
import Navbar from './Navbar.js';
import './components-css/Signup.css';
import './components-css/Signin.css';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from './Session.jsx';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App.js';
import { authWithGoogle } from './Firebase.js';

export default function Signin() {
  const { theme, toggleTheme } = useContext(UserContext)

    const [passwordVisible, setPasswordVisible] = useState(false);

    const auth = useRef();

    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext)


    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(serverRoute, formData)
        .then(({ data }) => {
            storeInSession("user", JSON.stringify(data))
            setUserAuth(data)
        })
        .catch(({ response }) => {
            toast.error("ERROR: "+response.data.error)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let form = new FormData(auth.current)
        let formData = {}

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        let { email, password } = formData

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        if (!email.length) {
            return toast.error('Enter an Email.')
        }

        if (!emailRegex.test(email)) {
            return toast.error('Email is invalid.')
        }

        if (!passwordRegex.test(password)) {
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter")
        }

        userAuthThroughServer("http://localhost:3030/signin", formData)


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
                <div className='signup'>
                    <div className={theme==='light'? 'heading': 'heading heading-dark'}>
                        <img src={theme==='light' ? `${process.env.PUBLIC_URL}/imgs/A.png` : `${process.env.PUBLIC_URL}/imgs/A2.png`}  alt="logo-img" height="30" />
                        <div className="txt">Welcome Back</div>
                    </div>

                    <div className={theme==='light'? 'email inpbox inp1': 'email inpbox inp1 inpbox-dark'}>
                        <i className="fa-solid fa-envelope"></i>
                        <input type="email" name="email" id="email" placeholder='Email' />
                    </div>
                    {/* <div className="email inpbox">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" name="email" id="email" placeholder='Email' />
                    </div> */}
                   <div className={theme==='light'? 'password inpbox': 'password inpbox inpbox-dark'}>
                        <i class="fa-solid fa-key"></i>
                        <input type={
                            passwordVisible ? "text" : "password"
                        } name="password" id="password" placeholder='Password' />
                        <i class={"fa-solid " + (passwordVisible ? " fa-eye" : " fa-eye-slash")} style={{ cursor: "pointer" }} onClick={
                            () => setPasswordVisible(currentVal => !currentVal)
                        }></i>
                    </div>

                    <button onClick={handleSubmit} className={theme==='light'? 'signupbtn': 'signupbtn signupbtn-dark'}>Sign in</button>

                    <div className={theme==='light'? 'divider1': 'divider1 divider-dark'}>Or</div>

                    <button onClick={handleGoogleAuth} className={theme==='light'? 'signwithgoogle': 'signwithgoogle signwithgoogle-dark'}>
                        <img src="./imgs/google.png" alt="" height={40} />
                        <div className="googletxt">
                            Continue with Google
                        </div>
                    </button>

                    <div className={theme==='light'? 'redirect': 'redirect redirect-dark'}>
                        Not a member?  
                        <a href="/signup">Sign up here</a>
                    </div>
                </div>
            </form>

        </>
    )
}
