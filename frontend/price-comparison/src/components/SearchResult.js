import React from 'react'
import Navbar from './Navbar.js';
import SearchAndFilter from './SearchAndFilter.js';
import TitleBar from './TitleBar.js';

export default function SearchResult(props) {
  return (
    <div className='SearchResult'>
      <Navbar/>
      <TitleBar term={props.term} search={props.search}/>
      {
        console.log("termsmsms: "+props.term)
      }
      <SearchAndFilter term={props.term}/>
    </div>
  )
}
