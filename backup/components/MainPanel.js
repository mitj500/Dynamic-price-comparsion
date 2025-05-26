import React from 'react'
import SearchBar from './SearchBar.js'
import './components-css/MainPanel.css'
import BentoItem from './BentoItem.js';

export default function MainPanel() {
    let indexes1 = [1,2,3,4,5,6];
    let indexes2 = [1];

  return (
    <>
    <div className='MainPanel'>
      <div className="bento bento1">
        Find the Best Prices and Best Deals Instantly.
        <SearchBar/>
      </div>
      <div className="bento bento2">
        {
            indexes1.map((index) => {
                return <BentoItem key={index} item='apple' id={index} />
            })
        }
      </div>
      <div className="bento bento3">
      {
            indexes2.map((index) => {
                return <BentoItem key={index} item='samsung' id={index} />
            })
        }
      </div>
    </div>
    <div className="MainPanel">
      <div className="bento bento4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt quam repudiandae ut blanditiis perferendis minus, totam dolorem quidem aliquam omnis.
      </div>
      <div className="bento bento5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque autem quod aspernatur qui culpa, veniam nam tenetur illo fugiat enim?
      </div>
      <div className="bento bento6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut explicabo repellat minus amet magni fugiat molestias quidem fuga quaerat ea.
      </div>
    </div>
    </>
  )
}
