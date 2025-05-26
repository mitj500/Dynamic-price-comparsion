import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { UserContext } from '../App'
import Navbar from './Navbar.js'
import './components-css/SideNav.css'
import { useState } from 'react'

export default function SideNav() {
  const { theme, toggleTheme } = useContext(UserContext)
  

    let { userAuth: { access_token }} = useContext(UserContext)

    let [ page, setPageState ] = useState()
    const location = useLocation();
  
    const currentPath = location.pathname;
    console.log(currentPath)
    
  return (

    access_token === null ? <Navigate to="/signin"/> : 
    <div>
        <Navbar />

        <div className={theme==='light'? 'sidenav' : 'sidenav sidenav-dark'}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <div className="panel-header">Settings</div>
            <div className="panel-holder">
                <a className={currentPath === "/settings/edit-profile" ? "edit-profile active" : "edit-profile"} href='/settings/edit-profile' onClick={(e) => setPageState("profile")}><i className="fa-regular fa-user"></i> Edit Profile</a>
                <a className={currentPath === "/settings/change-password" ? "change-password active2" : "change-password"} href='/settings/change-password'  onClick={(e) => setPageState("password")}><i className="fa-solid fa-lock"></i> Change Password</a>
            </div>
        </div>
      <Outlet />
    </div>
  )
}
