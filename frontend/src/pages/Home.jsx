import NavBar from "../components/Navbar";
import "../assets/styles/home.css"
import SideBar from "../components/sideBar";
import Content from "../components/Content";
import CommunityDisplay from "../components/Community_Display";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
function Home(){
    const [contentType,setContentType] = useState("Posts");
    const {user} = useAuth();
    console.log(user);
    return (
        <div>
            <NavBar/>
            <div className="home-content">
                <SideBar onSideBarClick={(type)=>{setContentType(type);}}/>
                <Content type={contentType}/>
                <CommunityDisplay />
            </div>
        </div>
    )
}
export default Home;