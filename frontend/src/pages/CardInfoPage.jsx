import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/infoPage.css";
import InfoCards from "../components/InfoCard";
export default function CardInfoPage() {
    const location = useLocation();
    const {type, formattedData} = location.state;
    console.log(formattedData);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }
    return (
        <div className="info-page-container">
            <button className="back-to-home-btn" onClick={handleClick}>Back to Home</button>
            <InfoCards type={type} data = {formattedData}/>
        </div>
    )
}

