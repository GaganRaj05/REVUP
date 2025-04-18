import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function SideBar({onSideBarClick}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {user} = useAuth();
  const navigate = useNavigate();
  const handleBtnClick = (e, btnType) => {
    e.preventDefault();
    if(btnType === "Posts" || btnType === "Events" || btnType=== "Rent") {
      onSideBarClick(btnType);
      return;
    }
    if(!user) {
      console.log("working")
      navigate("/login")
      return;
    }
    console.log("this is user")
  }

  return (
    <div className={`side-bar-container ${isCollapsed ? "collapsed" : ""}`}>
      <button
        className="sidebar-toggle-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "➤" : "❮"}
      </button>

      {!isCollapsed && (
        <div className="side-bar-controls-container">
          <div className="side-bar-controls">
            <button id="side-bar-controls-btn1" className="side-bar-controls-btn" onClick={(e)=>{handleBtnClick(e, "Posts")}}>Posts</button>
            <button className="side-bar-controls-btn" onClick={(e)=>{handleBtnClick(e,"Events")}}>Events</button>
            <button className="side-bar-controls-btn" onClick={(e)=>{handleBtnClick(e, "Rent")}}>Rent</button>
            <button className="side-bar-controls-btn" onClick={(e)=>{handleBtnClick(e,"Communities")}}>Communities</button>
            <button className="side-bar-controls-btn" onClick={(e)=> handleBtnClick(e,"Profile")}>Profile</button>
          </div>

          <div className="side-bar-settings-container">
            <button className="side-bar-controls-btn" onClick={(e)=> handleBtnClick(e,"Settings")}>Settings</button>
            <button className="logout-btn" onClick={(e)=> handleBtnClick(e,"Settings")}>Logout</button>
          </div>
        </div>
      )}
  


      
    </div>
    

  );
}

export default SideBar;
