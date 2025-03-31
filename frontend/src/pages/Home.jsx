import NavBar from "../components/Navbar";
import "../assets/styles/home.css"
import SideBar from "../components/sideBar";
import Content from "../components/Content";
import CommunityDisplay from "../components/Community_Display";
import { useState } from "react";
function Home(){
    const [contentType,setContentType] = useState("");
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