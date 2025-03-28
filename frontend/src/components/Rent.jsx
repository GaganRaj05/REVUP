import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/postform.css';
import Get_Vehicles from '../services/vehicles';

const Rent = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVehicles() {
      const response = await Get_Vehicles();

      if (response.error) {
        setError("Some error occurred, please try again later");
        return;
      }

      setCars(response);
    }

    fetchVehicles(); // Call the function inside useEffect
  }, []);

  const handleCarClick = (carId) => {
    navigate(`/rent/${carId}`); // Navigate to the car details page
  };

  return (
    <div className="rent-container">
      <h1>Cars Available for Rent</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="car-list">
        {cars.map((car) => (
          <div
            key={car._id}
            className="car-card"
            onClick={() => handleCarClick(car._id)} 
          >
            <img src={`${car.image}`} alt={car.model_name} className="car-image" />
            <h2>{car.model_name}</h2>
            <p>{car.description}</p>
            <p><strong>Price:</strong> {car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rent;
