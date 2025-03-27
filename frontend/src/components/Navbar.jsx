import React, { useState } from 'react';
import '../assets/styles/postform.css';
import Login from "./login";
import "../assets/styles/login.css"
import {Logout} from "../services/auth"
import Registration from './registration';
const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterPopUp,setIsRegisterPopUp] = useState(false);
  const handleLogoutClick = async(e)=> {
    e.preventDefault();
    const response = await Logout();

    if(response.error) alert(response.error);
    setIsLoggedIn(false);
    alert("logout successfull");
  }
  const handleRegistrationClick = (e) => {
    e.preventDefault();
    setIsLoginOpen(false);
    setIsRegisterPopUp(true);

  }

  return (
    <div className='navbar-container'>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">REVUP</span>
        </div>
        <div className="navbar-right">

        <div className='register'>
          <a href="">Add event</a>
        </div>
        <div className='register'>
          <a href="">Add vehicle</a>
        </div>
        <div className='register'>
          <a href="">Post something</a>
        </div>
        {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
          ) : (
            <button style={{backgroundColor:"white",color:"black"}} className="login-button" onClick={() => setIsLoginOpen(true)}>Login</button>
          )}
                  <div className='register'>
          <a href="" onClick={handleRegistrationClick}>Sign up</a>
        </div>
        </div>
      </nav>
      {isRegisterPopUp && <Registration onClose={()=>setIsRegisterPopUp(false)} popupL={()=>{setIsRegisterPopUp(false);setIsLoginOpen(true)}}  />}
      {/* Show the Login popup when isLoginOpen is true */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} onLogin = {()=>setIsLoggedIn(true)} popupR={()=>{setIsLoginOpen(false);setIsRegisterPopUp(true)}} />}
    </div>
  );
};

export default Navbar;
