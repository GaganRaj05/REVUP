import React from 'react';
import "../assets/styles/postform.css";

const Postform = ({ username, profilePic, imageUrl, caption, likes }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img src={profilePic} alt={username} className="profile-pic" />
        <span className="username">{username}</span>
      </div>
      <img src={imageUrl} alt="Post" className="post-image" />
      <div className="post-actions">
        <span className="action-icon">❤️</span>
        <span className="action-icon">💬</span>
        <span className="action-icon">📤</span>
        <span className="action-icon save">🔖</span>
      </div>
      <div className="post-footer">
        <span className="likes">{likes} likes</span>
        <p className="caption">
          <strong>{username}</strong> {caption}
        </p>
      </div>
    </div>
  );
};

export default Postform;