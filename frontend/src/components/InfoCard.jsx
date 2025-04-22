import Slider from "react-slick";

export default function InfoCards({ type, data }) {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    className: "custom-info-slider",
  };
  console.log(data);

  return (
    <div className="info-cards">
      <div className="event-image">
        {data.image.length === 1 ? (
          <img src={data.image[0]} alt="Post" />
        ) : (
          <Slider {...carouselSettings}>
            {data.image.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Post ${index}`} className="carousel-img" />
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className="event-info">
        <div className="event-name">
          <h1 style={{ marginLeft: "50px" }}>{data.name}</h1>
        </div>
        <div>
          <h1>Location:</h1>
          <h1 className="venue">{data.venue}</h1>
        </div>
      </div>
      <div className="event-description">
        <h1>Info</h1>
        <p>{data.description}</p>
        {type === "Events" && data.date && <h1>Date:{data.date}</h1>}
        {type === "Events" && !data.date && <h1>Date: Not provided yet</h1>}
        {type === "Rent" && data.price && <h1>Price: {data.price}</h1>}
      </div>
      <div className="more-info">
        <p>
          Need more info? Contact:
          <a href={`tel:${data.contact}`} className="contact-link">
            {data.contact}
          </a>
        </p>
      </div>
    </div>
  );
}
