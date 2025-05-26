import React from 'react'
import './components-css/Navbar.css';

export default function Navbar() {
  return (
    <div className='Navbar'>
      <div className="logo">
        <img src="" alt="logo-img" />
      </div>
      <div className="nav-panel">
        <div className="txt txt1"><a href="/">Home</a></div>
        <div className="txt txt2"><a href="/">Learn More</a></div>
        <div className="txt txt3"><a href="/">Signup</a></div>
        <div className="txt txt4"><a href="/">Login</a></div>
      </div>
    </div>
  )
}
