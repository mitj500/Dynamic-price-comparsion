import React, { useContext } from 'react'
import Navbar from './Navbar.js'
import SearchItem from './SearchItem.js'
import { useState, useEffect } from 'react'
import { UserContext } from '../App'
import { storeInSession } from './Session.jsx';
import axios from 'axios';
import './components-css/Saves.css';

export default function Saves() {
    const { theme, toggleTheme } = useContext(UserContext)

    const [responseData, setResponseData] = useState({ link: [], saveName: [], saveLink: [] });

    const { userAuth, userAuth: { access_token, username, profile_img, saves }, setUserAuth } = useContext(UserContext)

    useEffect(() => {
        const userData = {
            username: username
        }
        if (access_token) {
            axios.post("http://localhost:3030/get-links", userData)
                .then(({ data }) => {
                    if (data.error) {
                        console.log("already there")
                    }
                    else {
                        setResponseData(data.saves)
                        return
                    }

                })
                .catch(({ response }) => {
                    return response.data.error
                })
        }
    }, [userAuth.saves])




    return (
        <div className='Saves'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0" />
            <Navbar />
            <div className={theme==='light'? 'save-nav' : 'save-nav save-nav-dark'}>
                <a href="/"><div className="go-back"><span className="back-icon material-symbols-outlined">
                    arrow_back_ios
                </span></div></a>
                <div className="save-header">Your Saves</div>

            </div>
            <div className="item-holder">

                {saves && responseData.link.length > 0 ? (
                    responseData.link.map((link, index) => {
                        const params = new URLSearchParams(link.slice(link.indexOf('?') + 1));
                        const name = params.get('name');
                        const image = params.get('image');
                        const price = params.get('price');
                        const stars = params.get('stars');
                        const productLink = params.get('link');
                        const ratings = params.get('ratings');
                        return (
                            <div className="itemWrapper3" key={index}>
                                <SearchItem
                                    name={name}
                                    link={productLink}
                                    image={image}
                                    price={price}
                                    stars={stars}
                                    ratings={ratings}
                                />

                            </div>
                        );
                    })
                ) : (
                    <div className={theme==='light'? 'no-saves' : 'no-saves no-saves-dark'}>
                        <img src="./imgs/nosaves.png" alt="Nothing Saved" />
                        <div className="no-saves-head"><i class="fa-regular fa-bookmark nosaveicon"></i> Nothing Saved Yet</div>
                        <div className="no-saves-content">All the Products you've saved will show up here.</div>
                    </div>
                )}
            </div>
        </div>
    )
}
