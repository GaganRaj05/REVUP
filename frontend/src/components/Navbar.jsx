import React from 'react';
import '../assets/styles/postform.css';

const Navbar = () => {
  const isLoggedIn = false; // Replace with actual authentication logic

  return (
    <div className='navbar-container'>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">REVUP</span>
        </div>
        <div className="navbar-center">
          <input type="text" placeholder="Search" className="search-bar" />
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <button className="logout-button">Logout</button>
          ) : (
            <button className="login-button">Login</button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;