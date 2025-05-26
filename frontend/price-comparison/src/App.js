import './App.css';
import LandingPage from './components/LandingPage.js';
import SearchResult from './components/SearchResult.js'
import Saves from './components/Saves.js'
import Product from './components/Product.js'
import Proxy from './components/Proxy.js'
import React, { createContext, useEffect, useState } from 'react'
import Signup from './components/Signup.js'
import Signin from './components/Signin.js'
import SideNav from './components/SideNav'
import EditProfile from './components/EditProfile.js'
import ChangePassword from './components/ChangePassword.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lookInSession } from './components/Session';
import Test from './components/Test.js'

export const UserContext = createContext({})

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const [userAuth, setUserAuth] = useState({ });
  
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      // Store the new theme in localStorage
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });

  };


  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token : null })
  }, [])

  const search = (term) => {
    setSearchTerm(term);
  }
  return (
    <div className={theme==='light'?"App" :"App App-dark" }>
      <UserContext.Provider value={{userAuth, setUserAuth, theme, toggleTheme}}>
        <Router>
          <Routes>
            <Route exact path='/' element={<LandingPage search={search}/>}/>
            <Route exact path='/signup' element={<Signup />}/>
            <Route exact path='/signin' element={<Signin />}/>
            <Route path='/settings' element={<SideNav />}>
              <Route path='edit-profile' element={<EditProfile />}/>
              <Route path='change-password' element={<ChangePassword />}/>
            </Route>
            <Route exact path='/proxy' element={<Proxy term={searchTerm}/>}/>
            <Route exact path='/search' element={<SearchResult term={searchTerm} search={search}/>}/>
            <Route exact path='/product/:name' element={<Product/>}/>
            <Route exact path='/saves' element={<Saves/>}/>
            <Route exact path='/test/:name' element={<Test/>}/>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
