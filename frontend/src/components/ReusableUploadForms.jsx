import { useState } from "react";
import { toast } from "react-toastify";
import uploadFeature from "../services/uploadFeatures";


function UploadForms({type, onClose}) {
  const [postForm, setPostForm] = useState({
    caption: "",
    image: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [eventForm, setEventForm] = useState({
    name:"",
    event_type:"",
    description:"",
    venue:"",
    date:"",
    location:"",
    time:"",
    image:[]
  })

  const [vehicleForm, setVehicleForm] = useState({
    model_name:"",
    description:"",
    price:"",
    contact_info:"",
    address:"",
    image:[]
  })
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleCaptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 29) {
      setPostForm((prev) => ({ ...prev, caption: value }));
    }
  };

  const handleRentalFormChange=(e)=> {
    setVehicleForm({...vehicleForm,[e.target.name]:e.target.value});
  }
const handleImageChange = (e, formType) => {
  e.preventDefault();
  const files = Array.from(e.target.files);

  if (files.length > 5) {
    toast.error("You can only upload a maximum of 5 images.");
    e.target.value = null;
    return;
  }

  const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
  if (oversizedFiles.length > 0) {
    toast.error("One or more files exceed the 5MB limit.");
    e.target.value = null;
    return;
  }

  imagePreviews.forEach(url => URL.revokeObjectURL(url));

  switch(formType) {
    case "Post":
      setPostForm(prev => ({ ...prev, images: files }));
      break;
    case "Event":
      setEventForm(prev => ({ ...prev, images: files }));
      break;
    case "Vehicle":
      setVehicleForm(prev => ({ ...prev, images: files }));
      break;
    default:
      break;
  }

  const previews = files.map(file => URL.createObjectURL(file));
  setImagePreviews(previews);
};

const handleSubmit = async (e, formType) => {
  e.preventDefault();
  
  let formData = new FormData();
  let formToUse;

  switch(formType) {
    case "Post":
      formToUse = postForm;
      break;
    case "Event":
      formToUse = eventForm;
      break;
    case "Vehicle":
      formToUse = vehicleForm;
      break;
    default:
      return;
  }

  Object.entries(formToUse).forEach(([key, value]) => {
    if (key === 'images') {
      value.forEach((file, index) => {
        formData.append(`image`, file);
      });
    } else {
      formData.append(key, value);
    }
  });

  try {
    const response = await uploadFeature(formData, formType);
    if (response.error) {
      throw new Error(response.error);
    }
    onClose();
    setIsLoading(false);
    toast.success(`${formType} uploaded successfully`);
  } catch (error) {
    toast.error(  "Some error occurred. Please try again later.");
  }
};

  const handleEventFormChange=(e)=> {
    setEventForm({...eventForm,[e.target.name]:e.target.value});
  }
  return (
    <div className="upload-overlay">
      <div className="upload-content">
      <button className="upload-close-button" onClick={onClose}>✖</button>

        {type === "Post" && (
            <form
            className="upload-form"
            onSubmit={(e)=>handleSubmit(e, "Post")}
            encType="multipart/form-data"
          >
            <h1>Upload Post</h1>
            <input
              type="text"
              placeholder="Caption"
              value={postForm.caption}
              onChange={handleCaptionChange}
              required
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e)=>handleImageChange(e,"Post")}
              required
            />
  
            {imagePreviews.length > 0 && (
              <div className="image-preview-container">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`preview-${idx}`}
                    className="preview-img"
                  />
                ))}
              </div>
            )}
  
            <button type="submit" disabled={isLoading}>Upload</button>
          </form>
        )}
        {type === "Vehicle" && (
            <form
            className="upload-form"
            onSubmit={(e)=>handleSubmit(e, "Vehicle")}
            encType="multipart/form-data"
          >
            <h1>Upload Vehicle</h1>
            <input
              type="text"
              placeholder="Model name"
              value={vehicleForm.model_name}
              onChange={handleRentalFormChange}
              name="model_name"
              required
            />
            <textarea  id="" onChange={handleRentalFormChange} placeholder="Description" name="description">
                {vehicleForm.description.value}
            </textarea>
            <input
              type="text"
              placeholder="Price"
              value={vehicleForm.price}
              name="price"
              onChange={handleRentalFormChange}
              required
            />
            <input
              type="text"
              placeholder="Contact Details"
              value={vehicleForm.contact_info}
              name="contact_info"
              onChange={handleRentalFormChange}
              required
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={vehicleForm.address}
              onChange={handleRentalFormChange}
              required
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e)=>handleImageChange(e, type)}
              required
            />
  
            {imagePreviews.length > 0 && (
              <div className="image-preview-container">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`preview-${idx}`}
                    className="preview-img"
                  />
                ))}
              </div>
            )}
  
            <button type="submit" disabled={isLoading}>Upload</button>
          </form>
        )}
                
        {type === "Event" && (
            <form
            className="upload-form"
            onSubmit={(e)=>handleSubmit(e, "Event")}
            encType="multipart/form-data"
          >
            <h1>Upload Events</h1>
            <input
              type="text"
              placeholder="Event name"
              value={eventForm.name}
              onChange={handleEventFormChange}
              name="name"
              required
            />
            <textarea  id="" onChange={handleEventFormChange} placeholder="Description" name="description">
                {eventForm.description.value}
            </textarea>
            <input
              type="text"
              placeholder="Event type"
              value={eventForm.event_type}
              name="event_type"
              onChange={handleEventFormChange}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={eventForm.location}
              name="location"
              onChange={handleEventFormChange}
              required
            />
            <input
              type="text"
              placeholder="Time"
              value={eventForm.time}
              name="time"
              onChange={handleEventFormChange}
              required
            />
            <input
              type="text"
              placeholder="Venue"
              value={eventForm.venue}
              name="venue"
              onChange={handleEventFormChange}
              required
            />
            
            <input
              type="date"
              placeholder="Date"
              name="date"
              value={eventForm.date}
              onChange={handleEventFormChange}
              required
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e)=>handleImageChange(e, type)}
              required
            />
  
            {imagePreviews.length > 0 && (
              <div className="image-preview-container">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`preview-${idx}`}
                    className="preview-img"
                  />
                ))}
              </div>
            )}
  
            <button type="submit" disabled={isLoading}>Upload</button>
          </form>
        )}

      </div>
    </div>
  );
}

export default UploadForms;
