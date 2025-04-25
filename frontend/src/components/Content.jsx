import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Get_Posts from "../services/posts";
import Cards from "./Cards";
import { GetEvents } from "../services/events";
import { RentalVehicles } from "../services/rent";
function Content({ type }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    console.log(type);
    async function getData() {
      setError("")
      if (type === "Posts") {
        const response = await Get_Posts();
        if (response.error) {
          setError(
            response.error === "Failed to fetch"
              ? "Some error occured please try again later"
              : response.error
          );
          return;
        }
        if (response.length === 0) {
          setError("No posts found");
          return;
        }
        setPosts(response);
        return;
      } else if (type === "Events") {
        const response = await GetEvents();
        if (response.error) {
          setError(
            response.error === "Failed to fetch"
              ? "Some error occured please try again later"
              : response.error
          );
          return;
        }
        if (response.length === 0) {
          setError("No Events found");
          return;
        }
        setEvents(response);
        return;
      } else if (type === "Rent") {
        const response = await RentalVehicles();
        if (response.error) {
          setError(
            response.error === "Failed to fetch"
              ? "Some error occured please try again later"
              : response.error
          );
          return;
        }
        if (response.length === 0) {
          setError("No rental vehicles found at the moment");
          return;
        }
        setVehicles(response);
        return;
      }
    }

    getData();
  }, [type]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    className: "custom-slider",
  };

  return (
    <div className="Content-section">
      {error && (
        <p
          style={{ color: "white", fontFamily: "sans-serif", fontSize: "30px" }}
          className="error-msg"
        >
          {error}
        </p>
      )}

      {(type === "" || type === "Posts") &&
        posts.map((post) => <Cards key={post._id} data={post} type={type} />)}
      {type === "Events" &&
        events.map((event) => (
          <Cards key={event._id} data={event} type={type} />
        ))}
      {type === "Rent" &&
        vehicles.map((vehicle) => (
          <Cards key={vehicle._id} data={vehicle} type={type} />
        ))}
    </div>
  );
}

export default Content;
