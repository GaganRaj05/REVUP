import { useState } from "react";
import {login} from "../services/auth";
function Login({ onClose, onLogin,popupR }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error,setError] = useState('')
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(formData)
        
        if(response.error ) {
            setError(response.error);
            return;
        }
        alert("Login successfull");
        onClose();
        onLogin();
        console.log("submitted", formData);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}>X</button>
                
                <form onSubmit={handleSubmit} method="POST">
                    {error && (<p style={{color:"red"}}>{error}</p>)}
                    <h3>Login</h3>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" name="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} required />
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={formData.password} required />
                    <button id="loginBtn" type="submit">Submit</button>
                    <p style={{fontSize:"15px"}}>Not a user yet? <a href="" onClick={(e)=>{e.preventDefault();popupR();}}>Register</a> </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
