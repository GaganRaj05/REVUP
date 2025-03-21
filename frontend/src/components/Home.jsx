import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Postform from './Postform.jsx';
import Event from './Event.jsx';
import Rent from './Rent.jsx';
import '../assets/styles/postform.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Post'); // Default to 'Post'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visibility state

  const posts = [
    {
      id: 1,
      username: 'user1',
      profilePic: 'https://picsum.photos/50',
      imageUrl: 'https://picsum.photos/600/400',
      caption: 'This is a sample post!',
      likes: 123,
    },
    {
      id: 2,
      username: 'user2',
      profilePic: 'https://picsum.photos/50',
      imageUrl: 'https://picsum.photos/600/400',
      caption: 'Another post here!',
      likes: 456,
    },
    {
      id: 3,
      username: 'user3',
      profilePic: 'https://picsum.photos/50',
      imageUrl: 'https://picsum.photos/600/400',
      caption: 'Yet another post!',
      likes: 789,
    },
  ];

  return (
    <div className="home">
      <Navbar />
      <div className="main-content">
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
            <div
              className={`sidebar-option ${activeTab === 'Post' ? 'active' : ''}`}
              onClick={() => setActiveTab('Post')}
            >
              <span>Post</span>
            </div>
            <div
              className={`sidebar-option ${activeTab === 'Events' ? 'active' : ''}`}
              onClick={() => setActiveTab('Events')}
            >
              <span>Events</span>
            </div>
            <div
              className={`sidebar-option ${activeTab === 'Rent' ? 'active' : ''}`}
              onClick={() => setActiveTab('Rent')}
            >
              <span>Rent</span>
            </div>
          </div>
        )}

        {/* Conditional Rendering */}
        <div className={`content-wrapper ${!isSidebarOpen ? 'expanded' : ''}`}>
          {activeTab === 'Post' && (
            <div className="feed">
              {posts.map((post) => (
                <Postform
                  key={post.id}
                  username={post.username}
                  profilePic={post.profilePic}
                  imageUrl={post.imageUrl}
                  caption={post.caption}
                  likes={post.likes}
                />
              ))}
            </div>
          )}
          {activeTab === 'Events' && <Event />}
          {activeTab === 'Rent' && <Rent />}
        </div>
      </div>
    </div>
  );
};

export default Home;