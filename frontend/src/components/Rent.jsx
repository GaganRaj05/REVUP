import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/postform.css';

const Rent = () => {
  const navigate = useNavigate();

  // Sample car data
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

  const handleCarClick = (carId) => {
    navigate(`/rent/${carId}`); // Navigate to the car details page
  };

  return (
    <div className="rent-container">
      <h1>Cars Available for Rent</h1>
      <div className="car-list">
        {cars.map((car) => (
          <div
            key={car.id}
            className="car-card"
            onClick={() => handleCarClick(car.id)} // Make the card clickable
          >
            <img src={car.imageUrl} alt={car.name} className="car-image" />
            <h2>{car.name}</h2>
            <p>{car.description}</p>
            <p><strong>Price:</strong> {car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rent;