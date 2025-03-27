import { useState } from "react";
import {Register} from "../services/auth"
import "../assets/styles/registration.css"
function Registration({onClose,popupL}) {
    const [formData,setFormData] = useState({name:"",phone:"",email:"",password:""});
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const handleChange = (e)=> {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const confirmChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        if(formData.password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const response = await Register(formData);

        if(response.error === "Failed to fetch") {
            setError("Some error occured please try again later")
            return;
        }
        if(response.error) {
            setError(response.error);
            return;
        }
        onClose();
        alert(" user account created successfully");


    }
    
    const handleLoginClick = (e) => {
        e.preventDefault();
        popupL();
    }

    return(
        <div className="popup-overlay">
        <div className="rpopup-content">
            <button className="close-btn" onClick={onClose}>X</button>
            
            <form onSubmit={handleSubmit} method="POST">
                {error && (<p style={{color:"red"}}>{error}</p>)}
                <h3>Signup</h3>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" placeholder="Enter your name" onChange={handleChange} value={formData.name} required />

                <label htmlFor="phone">phone</label>
                <input id="phone" type="text" name="phone" placeholder="Enter your phone" onChange={handleChange} value={formData.phone} required />
                <label htmlFor="email">Email</label>
                <input id="email" type="text" name="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} required />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={formData.password} required />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input id="confirm-password" type="text"  placeholder="Enter your password again" onChange={confirmChange} value={confirmPassword} required />


                <button id="loginBtn" type="submit">Submit</button>
                <p style={{fontSize:"15px"}}>Already have an account? <a href="" onClick={handleLoginClick} >Login</a> </p>
            </form>
        </div>
    </div>

    );
}
export default Registration;