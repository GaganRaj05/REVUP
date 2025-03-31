import Logo from "../assets/logo.png";
import SearchBar from "./searchBar";
import Login from "./login"
import { useState } from "react";

function NavBar() {
  const [isLoginOpen, setIsLoginOpen] = useState("");
  return (
    <div className="nav-bar-container">
      <nav className="navBar">
        <li>
          <img className="logo" src={Logo} alt="Revvup" />
        </li>
        <li> 
          <SearchBar/>
        </li>
        <li>
          <button className="login-btn" onClick={()=>{setIsLoginOpen(true)}}>
            Login
          </button>
        </li>
      </nav>
      {isLoginOpen && (<Login onClose ={()=>setIsLoginOpen(false)}/>)}
    </div>
  );
}
export default NavBar;