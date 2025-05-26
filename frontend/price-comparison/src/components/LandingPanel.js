import React, { useContext } from 'react'
import SearchPanel from './SearchPanel.js';
import Grid from './Grid.js';
import './components-css/LandingPanel.css'
import { UserContext } from '../App.js';

export default function LandingPanel(props) {
  const { theme, toggleTheme } = useContext(UserContext)

  return (
    <div className={theme==='light'? 'holder-div': 'holder-div holder-div-dark'}>
      <SearchPanel search={props.search}/>
      <Grid/>
    </div>
  )
}
