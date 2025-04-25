import { useState } from "react";
import { toast } from "react-toastify";
import Sign_up from "../services/signup";
function SignUp({ onClose, onLoginClick }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        file: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setFormData({ ...formData, file });
        }
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("confirmPassword", formData.confirmPassword);
        data.append("phone", formData.phone);
        if (formData.file) {
            data.append("image", formData.file);
        }

        const response = await Sign_up(data);
        setIsLoading(false);
        if(response.error) {
            onClose();
            toast.error("Some error occured please try again later");
            return;
        }
        toast.success("Account created successfully please login");
        onClose();
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2 className="text-center text-xl font-semibold mb-4 text-white">Sign Up</h2>

                <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">

                    <label htmlFor="image">Profile Picture</label>
                    <input 
                        id="image" 
                        type="file" 
                        accept="image/*" 
                        name="image" 
                        onChange={handleFileChange} 
                    />
                    {imagePreview && (
                        <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="image-preview" 
                            style={{ maxWidth: '100px', maxHeight: '100px' }} 
                        />
                    )}

                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name" 
                        onChange={handleChange} 
                        value={formData.name} 
                        required 
                    />

                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        onChange={handleChange} 
                        value={formData.email} 
                        required 
                    />

                    <label htmlFor="password">Password </label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        onChange={handleChange} 
                        value={formData.password} 
                        minLength={6}
                        required 
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        id="confirmPassword" 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm password" 
                        onChange={handleChange} 
                        value={formData.confirmPassword} 
                        minLength={6}
                        required 
                    />

                    <label htmlFor="phone">Phone</label>
                    <input 
                        id="phone" 
                        type="text" 
                        name="phone" 
                        placeholder="Enter your phone number" 
                        onChange={handleChange} 
                        value={formData.phone} 
                        required 
                    />

                    <button 
                        type="submit" 
                        className="login-submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                    <p>Already a user  ?<a  ><button style={{border:"0px",color:"gold",fontSize:"20px",backgroundColor:"#0d1114",cursor:"pointer"}} onClick={()=>onLoginClick()}>Login</button></a></p>

                </form>
            </div>
        </div>
    );
}

export default SignUp;