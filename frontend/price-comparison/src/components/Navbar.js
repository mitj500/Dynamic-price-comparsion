import React, { useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../App'
import './components-css/Navbar.css'
import NavigationPanel from './NavigationPanel.js'

export default function Navbar() {

  const { theme, toggleTheme } = useContext(UserContext)

  const [userNavPanel, setUserNavPanel] = useState(false);

  const { userAuth, userAuth: { access_token, profile_img, username } } = useContext(UserContext)

  const handleUserNavPanel = () => {
    setUserNavPanel(currentVal => !currentVal)
  }

  const handleBlur = () => {

    setTimeout(() => {
      setUserNavPanel(false);
    }, 200)

  }

  return (
    <div className={theme==='light'? 'nav-body' : 'nav-body nav-body-dark'}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <img src={theme==='light' ? `${process.env.PUBLIC_URL}/imgs/A.png` : `${process.env.PUBLIC_URL}/imgs/A2.png`} alt="logo-img" height="30" />
      <div className={theme==='light'? "nav-panel" : "nav-panel nav-dark"}>
        <div className={theme==='light'? "nav-txt nav-txt1" : "nav-txt nav-txt1 nav-txt-dark" }><a href="/"><i className="fa-solid fa-house"></i>&nbsp;&nbsp; Home</a></div>
        <button onClick={() => toggleTheme()}>{theme === "light" ? <i class="fa-regular fa-sun"></i> : <i class="fa-solid fa-moon"></i> }</button>
        <div className={theme==='light'? "nav-txt nav-txt2" : "nav-txt nav-txt2 nav-txt-dark" }><a href="/"><i className="fa-solid fa-info"></i>&nbsp;&nbsp; Learn More</a></div>
        {
          access_token ?
            <div className="user-nav" onClick={handleUserNavPanel} onBlur={handleBlur}>
              <button className='user-btn'>
                {/* <img src={profile_img} alt="profile_img" style={{objectFit:"cover", height:"30px"}} /> */}
                {username[0].toUpperCase()}
              </button>
              {
                userNavPanel ? <NavigationPanel /> : ""
              }

            </div>
            :
            <>
              <div className={theme==='light'? "nav-txt nav-txt3" : "nav-txt nav-txt3 nav-txt-dark" }><a href="/signup">Signup</a></div>
              <div className="nav-txt nav-txt4"><a href="/signin">Signin</a></div>
            </>
        }
      </div>
    </div>
  )
}
