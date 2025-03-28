import { useState } from "react";
import Upload_Vehicle from "../services/uploadVehicle";

function VehicleForm() {
    const [formData, setFormData] = useState({
        model_name: "",
        image: null,
        description: "",
        price: null,
        contact_info: "",
        address: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setSuccess("");

        const result = await Upload_Vehicle(formData);

        if (result.error) {
            setError(result.error);
        } else {
            setSuccess("Vehicle uploaded successfully!");
            setFormData({ model_name: "", image: null, description: "", price: "", contact_info: "", address: "" });
        }
    };

    return (
        <div className="vehicle-form">
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <h2 style={{ marginLeft: "30px" }}>Upload your Vehicle</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="model_name">Enter vehicle's model name</label>
                <input placeholder="Model name" id="model_name" type="text" name="model_name" onChange={handleChange} required value={formData.model_name} />

                <label htmlFor="image">Enter vehicle image</label>
                <input type="file" name="image" id="image" accept="image/*" onChange={handleFileChange} required />

                <label htmlFor="description">About your vehicle</label>
                <textarea placeholder="Description" id="description" name="description" onChange={handleChange} required value={formData.description}></textarea>

                <label htmlFor="price">Offering Price</label>
                <input placeholder="Price" type="number" id="price" name="price" onChange={handleChange} required value={formData.price} />

                <label htmlFor="contact">Contact Info</label>
                <input placeholder="Contact Info" type="text" id="contact" name="contact_info" onChange={handleChange} required value={formData.contact_info} />

                <label htmlFor="address">Enter your address</label>
                <textarea placeholder="Address" name="address" onChange={handleChange} required value={formData.address}></textarea>

                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default VehicleForm;
