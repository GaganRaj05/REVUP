import { useEffect, useState } from "react";
import Login_Service from "../services/login";
import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';

function Login({onClose, onRegisterClick}) {
    const [formData, setFormData] = useState({email:"",password:""});
    const [isLoading,setIsLoading] = useState(false);
    const {user,setUser} = useAuth();
    
    const handleChange = (e)=> {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=> {
        if(user) {
            toast.success("Already Logged In")
            onClose();
            
            return;
        }    
        setIsLoading(true)
        e.preventDefault();
        const response = await Login_Service(formData);
        if(response) {
            setIsLoading(false);
        }
        if(response.error) {
            toast.error(response.error === "Failed to fetch" ? "Some error occured please try again later" : response.error);
            return;
        }
        setUser(response.data);
        onClose();
        toast.success("Login successfull");
    }

    return (
        <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>&times;</button>
          <h2 className="text-center text-xl font-semibold mb-4 text-white">Login</h2>
  
          <form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" placeholder="Enter your email id" onChange={handleChange} value={formData.email} required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} value={formData.password} required />
            <button type="submit" className="login-submit" disabled={isLoading}>Submit</button>
          <p>Not a user yet ?<a  ><button style={{border:"0px",color:"gold",fontSize:"20px",backgroundColor:"#0d1114",cursor:"pointer"}} onClick={()=>onRegisterClick()}>Register</button></a></p>

          </form>
        </div>
      </div>
      )
}
export default Login;