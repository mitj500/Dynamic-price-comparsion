import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { UserContext } from '../App';
import './components-css/NavigationPanel.css'
import { removeFromSession } from './Session';

export default function NavigationPanel() {
    const { userAuth: { username }, setUserAuth } = useContext(UserContext)

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ access_token: null })
    }
  return (
    <AnimatePresence>
        <motion.div
        initial={{opacity: 0.1}}
        animate={{opacity: 1}}
        transition={{duration: 0.2 }}
        className="animationdiv">
            
            <div className="drop-panel">
                <a href="/saves" className='nav-item nav-beg'><i class="fa-solid fa-bookmark"></i> Saves</a>
                <a href={`/settings/edit-profile`} className='nav-item'><i class="fa-regular fa-user"></i> Profile</a>
                <a href={`/settings/edit-profile`} className='nav-item'><i class="fa-solid fa-gear"></i> Settings</a>

                <button onClick={signOutUser} className='logout-btn nav-item nav-end'>
                    <div className="signout-txt"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</div>
                    <div className="user">@{username}</div>
                </button>
            </div>

        </motion.div>
    </AnimatePresence>
  )
}
