import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './Filter.js';
import SearchList from './SearchList.js';
import './components-css/SearchAndFilter.css';

export default function SearchAndFilter(props) {

  const [sortBy, setSortBy] = useState('');
  const [brand, setBrand] = useState('');

  const handleBrand = (selectedBrand) => {
    setBrand(selectedBrand)
    console.log(brand)
  }

  const handleChange = (selectedSort) => {
    setSortBy(selectedSort)
};

useEffect(() => {

}, [sortBy, brand]);

  return (
    <div className='SearchAndFilter'>
      <Filter handleSortChange={handleChange} handleBrand={handleBrand}/>
      <SearchList term={props.term} sortBy={sortBy} brand={brand}/>
      {
        console.log("searchandfilter: "+props.term)
      }
    </div>
  )
}
