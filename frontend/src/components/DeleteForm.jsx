import {deletePost,deleteEvent,deleteVehicle} from "../services/deleteFeatures";
import { toast } from "react-toastify";


const DeleteForms = ({ formType, onClose,item,onDeleteSuccess }) => {

    const handleBtnClick = async(e, type)=> {
        e.preventDefault();
        if(type === "no") {
            onClose();
            return;
        }
        if(formType === "Posts") {
            const response = await deletePost(item._id);
            if(response.error) {
                toast.error("Some error occured please try again later");
                return;
            }
            onClose();
            toast.success(`${formType} deleted successfully`);
            onDeleteSuccess(item._id)
            return;
        }
        else if(formType === "Events") {
            const response = await deleteEvent(item._id);
            if(response.error) {
                toast.error("Some error occured please try again later");
                return;
            }
            onClose();
            onDeleteSuccess(item._id);
            toast.success(`${formType} deleted successfully`);
            return;
        }
        else if(formType === "Vehicles") {
            const response = await deleteVehicle(item._id);
            if(response.error) {
                toast.error("Some error occured please try again later");
                return;
            }
            onClose();
            onDeleteSuccess(item._id)
            toast.success(`${formType} deleted successfully`);
            return;
        }

    }

    return (
        <div className="delete-overlay">
            <div className="delete-content">
                <button className="delete-close-button" onClick={onClose}>✖</button>
                <form className="delete-form">
                    <p>Are you sure you want to delete this {formType}?</p>
                    <div className="delete-controls">
                    <button id="yes-btn" type="submit" onClick={(e)=>handleBtnClick(e, "yes")}>Yes</button>
                    <button onClick={(e)=>handleBtnClick(e,"no")} id="no-btn" type="submit">No</button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteForms;
