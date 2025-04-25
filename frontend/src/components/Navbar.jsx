import Logo from "../assets/logo.png";
import SearchBar from "./searchBar";
import Login from "./login"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SignUp from "./signup";

function NavBar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
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
      {isLoginOpen && (<Login onClose ={()=>setIsLoginOpen(false)} onRegisterClick={()=>{setIsLoginOpen(false); setIsRegisterOpen(true)}}/>)}
      {isRegisterOpen && (<SignUp onClose={()=>setIsRegisterOpen(false)} onLoginClick={()=>{setIsRegisterOpen(false);setIsLoginOpen(true)}} />)}
    </div>
  );
}
export default NavBar;