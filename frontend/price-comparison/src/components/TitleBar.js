import React, { useContext, useState } from 'react'
import './components-css/TitleBar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export default function TitleBar(props) {
  const { theme, toggleTheme } = useContext(UserContext)


    const term = localStorage.getItem('TitleTerm', props.term);
    if (term) {
        if (props.term && term != props.term) {
            localStorage.setItem('TitleTerm', props.term)
        }
    }
    else {
        localStorage.setItem('TitleTerm', props.term)
    }

    const [sTerm, setSTerm] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/proxy');
        props.search(sTerm);
        console.log("s: " + sTerm)
    }

    window.addEventListener("scroll", function () {
        var searchBar = this.document.getElementsByClassName('title-search')[0];
        if (searchBar) {
            if (window.pageYOffset > 70) {
                searchBar.classList.add("sticky");
            } else {
                searchBar.classList.remove("sticky");
            }
        }

    })

    return (
        <div className='TitleBar'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <form className={theme==='light'? 'panel-search title-search' : 'panel-search title-search title-search-dark'} onSubmit={handleSubmit}>
                <span className="material-symbols-outlined">search</span>
                <input id='searchbar' value={sTerm} onChange={handleChange} className={theme==='light'? 'search-bar' : 'search-bar search-bar-dark'} type="text" placeholder='Search something' required />
            </form>
            <div className={theme==='light'? 'result-txt' : 'result-txt result-txt-dark'}>Search Results for <span>"{term}"</span></div>
        </div>
    )
}
