import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import Logout from "../services/logout";
import Login from "./login";

function SideBar({onSideBarClick}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSideBarLoginOpen, setIsSideBarLoginOpen] = useState(false);
  const {user, setUser} = useAuth();
  const navigate = useNavigate();

  const handleBtnClick = async (e, btnType) => {
    e.preventDefault();
     if(btnType === "Posts" || btnType === "Events" || btnType=== "Rent") {
      onSideBarClick(btnType);
      return;
    }
    if(!user) {
      setIsSideBarLoginOpen(true);
    }
    
    else if(btnType === "Communities") {
      toast.success("This feature is yet to be added, stay tuned!..")
    }
    else if(btnType === "Profile") {
      navigate("/user/profile", {state:{user_id:user.user_id}});
    }
    else if(btnType === "Logout") {
      const response = await Logout();
      if(response.error) {
        toast.error("Some error occured please try again later");
        return;
      }
      toast.success(response);
    }
  }
  
  const handleLogoutClick = async(e)=> {
    e.preventDefault();
    const response = await Logout();
    if(response.error) {
      toast.error("Some error occured please try again later");
      return;
    }
    setUser(null);
    toast.success("Logout successfull");

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
            {user && 
                 <button className="logout-btn" onClick={(e)=> handleLogoutClick(e)}>Logout</button>

            }
          </div>
        </div>
      )}
  

      {isSideBarLoginOpen && <Login onClose={()=>setIsSideBarLoginOpen(false)}></Login>}
      
    </div>
    

  );
}

export default SideBar;
