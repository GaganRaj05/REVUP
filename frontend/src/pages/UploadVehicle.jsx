import VehicleForm from "../components/vehicleUploadForm";
import "../assets/styles/upload_vehicle.css";
import { useNavigate } from "react-router-dom";

function UploadVehicle() {
    const navigate = useNavigate();
    return(
        <div>
            <button style={{backgroundColor:"white",color:"black",marginTop:"50px"}} onClick={()=>navigate('/')}>
                Back to home
            </button>
            <div className="upload-vehicle">
            <div className="vehicle-upload-main-content">
                <div className="some-thing-funny">
                <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXRvczJmYnFoNWJkdnN2Z21sNGU5NDYwcHV6dnlnenduZjFkNG50MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/p6XEpjoGATasulXVMu/giphy.gif" alt="Funny GIF"/>

                </div>
                <VehicleForm/>
            </div>

        </div>
        </div>
    )
}
export default UploadVehicle;