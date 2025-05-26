import React, { useContext } from 'react'
import GridItem from './GridItem.js'
import './components-css/Grid.css'
import { UserContext } from '../App.js';

export default function Grid() {
  const { theme, toggleTheme } = useContext(UserContext)

  const hrefs = ['airpodsmax.png', 'airpodspro.png', 'applewatch.png', 'iphone15.png', 'macbookpro.png', 'tv.png', 'ipadpro.png', 's24ultra.png', 'imac.png'];
  const bgColors = ['#fbcdcd', '#d6f3fc', '#d6ffda', '#000000', '#ffdcff', '#fff9da', '#ffffff', '', '#d3e2ff'];
  return (
    <div className={theme==='light'?'img-holder-div': 'img-holder-div img-holder-div-dark'}>
      {
        hrefs.map((href, index) => {
          let color = bgColors[index];
          return (
            <div className="img-div">
              <GridItem key={index} id={index} hrefs={href} bgColor={color} />
            </div>
          )
        })
      }
    </div>
  )
}
