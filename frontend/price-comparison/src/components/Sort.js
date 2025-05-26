import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { UserContext } from '../App';
import './components-css/Sort.css';

export default function Sort({ handleSortChange }) {

  const { theme, toggleTheme } = useContext(UserContext)


    const [nameDir, setNameDir] = useState("up");
    const [priceDir, setPriceDir] = useState("up");
    const [ratingDir, setRatingDir] = useState("up");
    const [curr, setCurr] = useState('');
    

    const handleChangeSort = (e) => {
        setCurr(e.target.value)
        console.log("target:"+e.target.value)
        handleSortChange(e.target.value);
    };

    const toggleDirection = () => {
        const newDirection = nameDir === 'up' ? 'down' : 'up';
        setNameDir(newDirection);
        handleSortChange(newDirection === 'up' ? 'name' : 'name2');
    };

    const toggleDirection2 = () => {
        const newDirection2 = priceDir === 'up' ? 'down' : 'up';
        setPriceDir(newDirection2);
        handleSortChange(newDirection2 === 'up' ? 'price' : 'price2');
    };

    const toggleDirection3 = () => {
        const newDirection2 = ratingDir === 'up' ? 'down' : 'up';
        setRatingDir(newDirection2);
        handleSortChange(newDirection2 === 'up' ? 'rating' : 'rating2');
    };

    return (
        <div className='Sort'>
            <div className={theme==='light'? 'sort-header' : 'sort-header sort-header-dark'}>Sort By</div>
            {
                nameDir === 'up'? <div className={theme==='light'? 'namesort sortval' : 'namesort sortval sortval-dark'}>
                {curr === 'name2' || curr === 'name'? <i class="fa-solid fa-check tickmark"></i> : " "}
                <label className='labelfield' htmlFor="sortname1">Name <i class="fa-solid fa-arrow-up"></i></label>
                <input onClick={toggleDirection} type="radio" name="sort" id="sortname1" value="name" onChange={handleChangeSort} /> </div>
                : <div className={theme==='light'? 'namesort sortval' : 'namesort sortval sortval-dark'}>
                {curr === 'name2' || curr === 'name'? <i class="fa-solid fa-check tickmark"></i> : " "}
                <label className='labelfield' htmlFor="sortname2">Name <i class="fa-solid fa-arrow-down"></i></label>
                <input onClick={toggleDirection} type="radio" name="sort" id="sortname2" value="name2" onChange={handleChangeSort} /> </div>

            }
             {
                priceDir === 'up'? <div className={theme==='light'? 'pricesort sortval' : 'pricesort sortval sortval-dark'}>
                {curr === 'price' || curr === 'price2'? <i class="fa-solid fa-check tickmark"></i> : " "}
                <label className='labelfield' htmlFor="sortprice1">Price&nbsp;&nbsp; <i class="fa-solid fa-arrow-up"></i></label>
                <input onClick={toggleDirection2} type="radio" name="sort" id="sortprice1" value="price" onChange={handleChangeSort} /></div>
                : <div className={theme==='light'? 'pricesort sortval' : 'pricesort sortval sortval-dark'}>
                {curr === 'price2' || curr === 'price'? <i class="fa-solid fa-check tickmark"></i> : " "}
                 <label className='labelfield' htmlFor="sortprice2">Price&nbsp;&nbsp; <i class="fa-solid fa-arrow-down"></i></label>
                <input onClick={toggleDirection2} type="radio" name="sort" id="sortprice2" value="price2" onChange={handleChangeSort}/> </div>

            }
            {/* {
                ratingDir === 'up'? <>
                <label htmlFor="rating">Rating <i class="fa-solid fa-arrow-up"></i></label>
                <input onClick={toggleDirection3} type="radio" name="sort" id="rating" value="rating" onChange={handleChange} /></>
                : <>
                 <label htmlFor="rating2">Rating <i class="fa-solid fa-arrow-down"></i></label>
                <input onClick={toggleDirection3} type="radio" name="sort" id="rating2" value="rating2" onChange={handleChange}/> </>

            } */}
         
            
        </div>
    )
}
