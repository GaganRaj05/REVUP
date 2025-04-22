import Logo from "../assets/logo.png";
import SearchBar from "./searchBar";
import Login from "./login"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const [isLoginOpen, setIsLoginOpen] = useState("");
  const {user} = useAuth();
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
          {!user && 
            <button className="login-btn" onClick={()=>{setIsLoginOpen(true)}}>
            Login
          </button>
          }
        </li>
      </nav>
      {isLoginOpen && (<Login onClose ={()=>setIsLoginOpen(false)}/>)}
    </div>
  );
}
export default NavBar;