import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/styles/postform.css';

const CarDetails = () => {
  const { carId } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate();

  // Sample car data (replace this with data fetched from an API)
  const cars = [
    {
      id: 1,
      name: 'Tesla Model S',
      imageUrl: 'https://picsum.photos/400/300?car=1',
      description: 'Luxury electric sedan with autopilot features.',
      price: '₹10,000 per day',
      host: 'Tesla Rentals',
    },
    {
      id: 2,
      name: 'Ford Mustang',
      imageUrl: 'https://picsum.photos/400/300?car=2',
      description: 'Iconic muscle car with a powerful V8 engine.',
      price: '₹15,000 per day',
      host: 'Ford Rentals',
    },
    {
      id: 3,
      name: 'BMW i8',
      imageUrl: 'https://picsum.photos/400/300?car=3',
      description: 'Hybrid sports car with futuristic design.',
      price: '₹20,000 per day',
      host: 'BMW Rentals',
    },
    {
      id: 4,
      name: 'Audi R8',
      imageUrl: 'https://picsum.photos/400/300?car=4',
      description: 'High-performance supercar with Quattro all-wheel drive.',
      price: '₹25,000 per day',
      host: 'Audi Rentals',
    },
  ];

  // Find the car by ID
  const car = cars.find((c) => c.id === parseInt(carId));

  if (!car) {
    return <div>Car not found!</div>;
  }

  return (
    <div className="car-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ◄ Back to Rent
      </button>
      <h1>{car.name}</h1>
      <img src={car.imageUrl} alt={car.name} className="car-details-image" />
      <p><strong>Description:</strong> {car.description}</p>
      <p><strong>Price:</strong> {car.price}</p>
      <p><strong>Host:</strong> {car.host}</p>
    </div>
  );
};

export default CarDetails;