import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/postform.css';

const Event = () => {
  const navigate = useNavigate();

  // Sample event data
  const events = [
    {
      id: 1,
      name: 'Annual Car Exhibition',
      date: '2023-11-15',
      location: 'College Ground, ABC University',
      description: 'Explore the latest car models and innovations from top automotive brands.',
      fees: 'Free',
      host: 'ABC University Automotive Club',
      imageUrl: 'https://picsum.photos/600/400?car=1',
    },
    {
      id: 2,
      name: 'Car Racing Expo',
      date: '2023-12-01',
      location: 'XYZ College, City Center',
      description: 'Witness thrilling car races and interact with professional racers.',
      fees: '₹200 per person',
      host: 'XYZ College Motorsports Team',
      imageUrl: 'https://picsum.photos/600/400?car=2',
    },
    {
      id: 3,
      name: 'Electric Vehicle Showcase',
      date: '2023-12-10',
      location: 'Innovation Hall, PQR Institute',
      description: 'Discover the future of electric vehicles and sustainable transportation.',
      fees: '₹100 per person',
      host: 'PQR Institute Green Energy Society',
      imageUrl: 'https://picsum.photos/600/400?car=3',
    },
    {
      id: 4,
      name: 'Vintage Car Rally',
      date: '2023-12-20',
      location: 'Heritage Ground, LMN College',
      description: 'Experience the charm of vintage cars from the 20th century.',
      fees: '₹300 per person',
      host: 'LMN College Heritage Club',
      imageUrl: 'https://picsum.photos/600/400?car=4',
    },
  ];

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`); // Navigate to the event details page
  };

  return (
    <div className="event-container">
      <h1>Car Events and Exhibitions</h1>
      <div className="event-list">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => handleEventClick(event.id)} // Make the card clickable
          >
            <img src={event.imageUrl} alt={event.name} className="event-image" />
            <h2>{event.name}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Fees:</strong> {event.fees}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;