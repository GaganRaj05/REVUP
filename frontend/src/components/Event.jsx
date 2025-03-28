import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetEvents } from "../services/event";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import "../assets/styles/postform.css";

const Event = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await GetEvents();

      if (response.error) {
        setIsLoading(false);
        setError(response.error === "Failed to fetch" ? "Some error occurred. Please try again later." : response.error);
        return;
      }
      
      setIsLoading(false);
      setEvents(response);
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="event-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && events.length > 0 && (
        <div>
          <h1>Car Events and Exhibitions</h1>
          <div className="event-list">
            {events.map((event) => (
              <div
                key={event._id}
                className="event-card"
                onClick={() => handleEventClick(event._id)}
              >
                {event.image.length > 1 ? (
                  <Carousel showThumbs={false} infiniteLoop autoPlay>
                    {event.image.map((img, index) => (
                      <div key={index}>
                        <img src={img} alt={`Slide ${index + 1}`} className="event-image" />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <img src={event.image[0]} alt={event.name} className="event-image" />
                )}
                
                <h2>{event.name}</h2>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.venue}</p>
                <p><strong>Description:</strong> {event.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
