import { useState } from "react";
import Content from "./Content";

function SideBar({onSideBarClick}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
            <button id="side-bar-controls-btn1" onClick={()=>{onSideBarClick("Posts")}}>Posts</button>
            <button onClick={()=>{onSideBarClick("Events")}}>Events</button>
            <button onClick={()=>{onSideBarClick("Rent")}}>Rent</button>
            <button>Communities</button>
            <button>Profile</button>
          </div>

          <div className="side-bar-settings-container">
            <button>Settings</button>
            <button>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
