import Navbar from './Navbar.js';
import LandingPanel from './LandingPanel.js';
import { useContext } from 'react';
import { UserContext } from '../App.js';

function App(props) {
  const { theme, toggleTheme } = useContext(UserContext)

  return (
    <div className="App">
      <Navbar/> 
      <LandingPanel search={props.search}/>
      <div className='blob'></div>
    </div>
  );
}

export default App;
