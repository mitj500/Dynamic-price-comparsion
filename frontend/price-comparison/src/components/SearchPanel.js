import React, { useContext, useState } from 'react';
import './components-css/SearchPanel.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export default function SearchPanel(props) {
  const { theme, toggleTheme } = useContext(UserContext)


    const navigate = useNavigate();
    const [term, setTerm] = useState('');

    const handleChange = (event) => {
        setTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/search');
        props.search(term);
    }

    const clickSearch = (event) => {
        var input = document.getElementById('searchbar');
        if (input.value = '') {
            event.preventDefault();
            input.reportValidity();
        }
        event.preventDefault();
        navigate('/search');
        props.search(term);
    }

    return (
        <div className={theme==='light'? 'search-holder' : 'search-holder search-holder-dark'}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div className={theme==='light'? 'panel-txt' : 'panel-txt panel-txt-dark'}>
                Find the <span className='main'>Best</span> Deals and <span className='main'>Best</span> Prices <span className="inst">Instantly.</span>
                <span className="smaller">
                    From your Favorite E-Commerce Sites
                </span>
            </div>
            <form className={theme==='light'? 'panel-search' : 'panel-search panel-search-dark'} onSubmit={handleSubmit}>
                <span className="material-symbols-outlined" onClick={clickSearch}>search</span>
                <input id='searchbar' value={term} onChange={handleChange} className={theme==='light'? 'search-bar' : 'search-bar search-bar-dark'}  type="text" placeholder='Search something' required />
            </form>
        </div>
    )
}

