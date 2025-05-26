import React, { useContext } from 'react'
import Sort from './Sort.js'
import { useState, useEffect } from 'react';
import './components-css/Filter.css';
import { UserContext } from '../App.js';

export default function Filter({ handleSortChange, handleBrand }) {
  const { theme, toggleTheme } = useContext(UserContext)


  const [brandArr, setBrandArr] = useState([]);

  const handleBrandChange = (e) => {
    const brandValue = e.target.value;
    const isChecked = e.target.checked;

    // Update brandArr based on the checkbox status
    if (isChecked) {
      setBrandArr(prevBrandArr => [...prevBrandArr, brandValue]);
    } else {
      // Remove all instances of brandValue from brandArr
      setBrandArr(prevBrandArr => prevBrandArr.filter(item => item !== brandValue));
    }

    // Pass the updated brandArr to handleBrand
    handleBrand(brandArr);
  };

  useEffect(() => {
    // Call handleBrand whenever brandArr changes
    handleBrand(brandArr);
  }, [brandArr, handleBrand]);

  window.addEventListener("scroll", function () {
    var sortfilter = document.getElementsByClassName('Filter')[0];
    if (sortfilter) {
      if (window.pageYOffset > 70) {
        sortfilter.classList.add("goup");
      } else {
        sortfilter.classList.remove("goup");
      }
    }

  })

  return (
    <div className='Filter'>
      <Sort handleSortChange={handleSortChange} />

      <div className={theme==='light'? "filter-header" : "filter-header filter-header-dark" }>Filter By</div>
      <div className={theme==='light'? "filter-box" : "filter-box filter-box-dark" }>
        <div className="brand-header">Brand</div>
        <div className="filter-brand">
          <div className="elem-holder">
            {brandArr.includes("apple") ? <i class="fa-solid fa-check"></i> : ""}
            <input type="checkbox" name="apple" id="apple" value="apple" onChange={handleBrandChange} />
            <label htmlFor="apple">Apple</label>
          </div>

          <div className="elem-holder">
            {brandArr.includes("samsung") ? <i class="fa-solid fa-check"></i> : ""}
            <input type="checkbox" name="samsung" id="samsung" value="samsung" onChange={handleBrandChange} />
            <label htmlFor="samsung">Samsung</label>
          </div>

          <div className="elem-holder">
            {brandArr.includes("oneplus") ? <i class="fa-solid fa-check"></i> : ""}
            <input type="checkbox" name="oneplus" id="oneplus" value="oneplus" onChange={handleBrandChange} />
            <label htmlFor="oneplus">OnePlus</label>
          </div>

          <div className="elem-holder">
            {brandArr.includes("redmi") ? <i class="fa-solid fa-check"></i> : ""}
            <input type="checkbox" name="redmi" id="redmi" value="redmi" onChange={handleBrandChange} />
            <label htmlFor="redmi">Redmi</label>
          </div>

        </div>
      </div>
    </div>
  )
}
