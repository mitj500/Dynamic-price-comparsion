import React, { useState, useEffect, useRef, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import './components-css/Product.css';
import Navbar from './Navbar.js'
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../App';
import { TwitterAuthProvider } from 'firebase/auth';
const images = require('./images/amazonlogo.png');
const images2 = require('./images/flipkart.png');
const images3 = require('./images/vs.pmg.png');
const images4 = require('./images/jm.png');

export default function Product() {
    const { theme, toggleTheme } = useContext(UserContext)

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const name = queryParams.get('name');
    const price = queryParams.get('price');
    const stars = queryParams.get('stars');
    const image = queryParams.get('image');
    const link = queryParams.get('link');
    console.log(link)
    const [w2Visible, setw2Visible] = useState(false);
    const [w1Visible, setw1Visible] = useState(false);


    const [flipData, setFlipData] = useState('');
    const [VSData, setVSData] = useState('');
    const [JMData, setJMData] = useState('');
    axios.defaults.baseURL = 'http://localhost:3030';

    useEffect(() => {
        sendData();
    }, []);

    const sendData = async () => {
        let flipPrice = localStorage.getItem('flipPrice');
        if (flipPrice && flipData && !(flipPrice == flipData)) {
            localStorage.setItem('flipPrice', flipData);
        }
        else if (!flipPrice) {
            localStorage.setItem('flipPrice', flipData);
        }

        sending();
        JMSend();
        VSSend();
    }

    const VSSend = async () => {

        try {
            const response = await axios.post('/api/sendVS', { name: name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setVSData(response.data);
            console.log("flip: " + response.data.pdPrice);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const sending = async () => {
        try {
            const response = await axios.post('/api/sendFlip', { name: name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setFlipData(response.data);
            console.log("flip: " + response.data.pdPrice);

        } catch (error) {
            console.error('Error fetching data:', error);
        }


    }

    const JMSend = async () => {
        try {
            const response = await axios.post('/api/sendJM', { name: name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setJMData(response.data);
            console.log("flip: " + response.data.pdPrice);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    if (document.getElementsByClassName('warn2')[0]) {
        document.getElementById('wa2').addEventListener('mouseover', function () {
            if (!w2Visible) {
                document.getElementsByClassName('warning2')[0].style.display = "flex";
                setw2Visible(true)
            }
        });
        document.getElementById('wa2').addEventListener('mouseout', function () {
            if (w2Visible) {
                document.getElementsByClassName('warning2')[0].style.display = "none";
                setw2Visible(false)
            }
        });
    }

    if (document.getElementsByClassName('warn1')[0]) {
        document.getElementById('wa1').addEventListener('mouseover', function () {
            if (!w1Visible) {
                document.getElementsByClassName('warning1')[0].style.display = "flex";
                setw1Visible(true)
            }
        });
        document.getElementById('wa1').addEventListener('mouseout', function () {
            if (w1Visible) {
                document.getElementsByClassName('warning1')[0].style.display = "none";
                setw1Visible(false)
            }
        });
    }

    return (
        <div className='Product'>
            <Toaster />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <Navbar />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0" />
            <div className={theme === 'light' ? 'product-panel' : 'product-panel product-panel-dark'}>
                <a href="/search" className="back">
                    <div className="go-back"><span className="back-icon material-symbols-outlined">
                        arrow_back_ios
                    </span>Back to search</div>
                </a>

                <div className="product-display">
                    <div className="img-panel">
                        <img src={image} alt="image" height="300" />
                    </div>
                    <div className="product-details">
                        <div className="pd pd-name">{name}</div>
                        <div className={theme === 'light' ? 'stars' : 'stars stars-dark'}><span class="staricon material-symbols-outlined">
                            star
                        </span>{String(stars).substring(0, 4) + "/" + String(stars).substring(10, 12)}</div>
                        <div className="pricing">
                            <a href={link} target="_blank">
                                <div className={theme === 'light' ? 'amazon-pd pd-price' : 'amazon-pd pd-price pd-price-dark'}>
                                    <div className="amazon-txt">₹{price}</div>
                                    <div className="amazon-img">
                                        <img src={images} alt="" height="100" width={100} />
                                    </div>
                                </div>
                            </a>
                            <a href={flipData.pdLink} target="_blank">
                                <div className={theme === 'light' ? 'flipkart-pd pd-price' : 'flipkart-pd pd-price pd-price-dark'}>
                                    <div className="flipkart-txt"> {
                                        flipData.pdPrice ? flipData.pdPrice : <div className="loader"></div>
                                    }</div>
                                    <div className="flipkart-img">
                                        <img src={images2} alt="" height="80" />
                                    </div>
                                </div>
                            </a>
                            <a href={VSData.pdLink} target="_blank">
                                <div className={theme === 'light' ? 'flipkart-pd pd-price' : 'flipkart-pd pd-price pd-price-dark'}>

                                    <div className="flipkart-txt"> {
                                        VSData.pdPrice ? "₹" + VSData.pdPrice : <div className="loader"></div>
                                    }</div>
                                    <div className="flipkart-img">
                                        <img src={images3} alt="" height="80" />
                                    </div>
                                </div>
                            </a>

                            <a href={JMData.pdLink} target="_blank">
                                <div className={theme === 'light' ? 'flipkart-pd pd-price' : 'flipkart-pd pd-price pd-price-dark'}>

                                    <div className="flipkart-txt"> {
                                        JMData.pdPrice ? JMData.pdPrice : <div className="loader"></div>
                                    }</div>
                                    <div className="flipkart-img">
                                        <img src={images4} alt="" height="40" />
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="warnings">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <div className="warn-txt">Some results may not be accurate.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}