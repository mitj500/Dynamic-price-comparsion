import React, { useState, useRef, useContext } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../App'
import './components-css/ChangePassword.css'
import axios from 'axios'
import { storeInSession } from './Session.jsx';


export default function ChangePassword() {
    const { theme, toggleTheme } = useContext(UserContext)

    const { userAuth, userAuth: { access_token, username, profile_img, saves }, setUserAuth } = useContext(UserContext)

    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);

    const changePasswordForm = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();

        let form = new FormData(changePasswordForm.current)
        let formData = {}

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        formData['username'] = userAuth.username

        let { currentPassword, newPassword, username } = formData

        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        if (!currentPassword.length || !newPassword.length) {
            return toast.error("Fill all the inputs")
        }
        if (!passwordRegex.test(currentPassword) || !passwordRegex.test(newPassword)) {
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter")
        }

        e.target.setAttribute("disabled", true)

        let loadingToast = toast.loading("Updating")

        axios.post("http://localhost:3030/change-password", formData)
        .then(() => {
            toast.dismiss(loadingToast)

            e.target.removeAttribute("disabled")
            return toast.success("Password updated")
        })
        .catch(({ response }) => {
            toast.dismiss(loadingToast)

            e.target.removeAttribute("disabled")
            return toast.error(response.data.error)
        })
    }

    return (
        <div className='password-holder'>
            <Toaster />
            <form ref={changePasswordForm}>
                <div className={theme==='light'? 'changeheader ': 'changeheader changeheader-dark'}>Change Password</div>
                <div className={theme==='light'? 'password inpbox': 'password inpbox inpbox-dark'}>
                    <i className="fa-solid fa-key"></i>
                    <input type={
                        passwordVisible1 ? "text" : "password"
                    } name="currentPassword" id="password1" placeholder='Current Password' />
                    <i className={"fa-solid " + (passwordVisible1 ? " fa-eye" : " fa-eye-slash")} style={{ cursor: "pointer" }} onClick={
                        () => setPasswordVisible1(currentVal => !currentVal)
                    }></i>
                </div>
                <div className={theme==='light'? 'password inpbox': 'password inpbox inpbox-dark'}>
                    <i className="fa-solid fa-key"></i>
                    <input type={
                        passwordVisible2 ? "text" : "password"
                    } name="newPassword" id="password2" placeholder='New Password' />
                    <i className={"fa-solid " + (passwordVisible2 ? " fa-eye" : " fa-eye-slash")} style={{ cursor: "pointer" }} onClick={
                        () => setPasswordVisible2(currentVal => !currentVal)
                    }></i>
                </div>
                <button type='submit' onClick={handleSubmit} className={theme==='light'? 'changepswd ': 'changepswd changepswd-dark'}>Change Password</button>
            </form>

        </div>
    )
}
