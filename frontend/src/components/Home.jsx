import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Postform from './Postform.jsx';
import Event from './Event.jsx';
import Rent from './Rent.jsx';
import '../assets/styles/postform.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Post'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isLoginOpen, setIsLoginOpen] = useState(false); 

  return (
    <div className="home">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />
      
      <div className={`main-content ${isLoginOpen ? 'blur-background' : ''}`}>
        {/* Sidebar Toggle Button */}
        <button
          className={`sidebar-toggle-button ${!isSidebarOpen ? 'left-edge' : ''}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? '◄' : '►'}
        </button>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="sidebar">
            <div className={`sidebar-option ${activeTab === 'Post' ? 'active' : ''}`} onClick={() => setActiveTab('Post')}>
              <span>Post</span>
            </div>
            <div className={`sidebar-option ${activeTab === 'Events' ? 'active' : ''}`} onClick={() => setActiveTab('Events')}>
              <span>Events</span>
            </div>
            <div className={`sidebar-option ${activeTab === 'Rent' ? 'active' : ''}`} onClick={() => setActiveTab('Rent')}>
              <span>Rent</span>
            </div>
          </div>
        )}

        {/* Conditional Rendering */}
        <div className={`content-wrapper ${!isSidebarOpen ? 'expanded' : ''}`}>
          {activeTab === 'Post' && (
            <div className="feed">
              <Postform username="user1" profilePic="https://picsum.photos/50" imageUrl="https://picsum.photos/600/400" caption="Sample post!" likes={123} />
            </div>
          )}
          {activeTab === 'Events' && <Event />}
          {activeTab === 'Rent' && <Rent />}
        </div>
      </div>

      {/* Login Popup (Ensure this is rendered above everything) */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default Home;
