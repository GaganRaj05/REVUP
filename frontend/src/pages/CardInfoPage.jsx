import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/infoPage.css";
import InfoCards from "../components/InfoCard";
export default function CardInfoPage() {
    const location = useLocation();
    const {type, formattedData} = location.state;
    console.log(formattedData);
    useEffect(()=> {

    })
    return (
        <div className="info-page-container">
            <InfoCards type={type} data = {formattedData}/>
        </div>
    )
}

