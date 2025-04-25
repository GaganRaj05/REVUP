import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TbArrowBigUp } from "react-icons/tb";
import { FaRegShareSquare } from "react-icons/fa";
import Like from "../services/like";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { ImArrowUp } from "react-icons/im";
import followFeature from "../services/FollowFeature";

export default function Cards({ data, type }) {
  const [followers, setFollowers] = useState(data.user_id.followers || []);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(data.like_count);
  const [liked, setIsLiked] = useState(false);

  const handledataLike = async (data_id) => {
    if (!user) {
      toast.error("Login to like the posts");
      return;
    }
    if (liked) {
      return;
    }
    const response = await Like(data_id);
    if (response.error) {
      toast.error("Some error occurred, please try again later");
      return;
    }
    setLikeCount(likeCount + 1);
    setIsLiked(true);
    toast.success("Liked a post");
  };

  const handleKnowMoreClick = () => {
    if (!user) {
      navigate("/login");
    } else if (type === "Events") {
      const formattedData = {
        id: data._id,
        name: data.name,
        image: data.image,
        type: data.event_type,
        description: data.description,
        venue: data.venue,
        date: data.date,
        contact: data.user.phone_number,
      };
      navigate("/events-info", { state: { type, formattedData } });
    } else if (type === "Rent") {
      const formattedData = {
        id: data._id,
        name: data.model_name,
        image: data.image,
        description: data.description,
        price: data.price,
        venue: data.address,
        contact: data.contact_info,
      };
      navigate("/events-info", { state: { type, formattedData } });
    }
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    toast.error("This website is not deployed yet, a shareable link will be given soon");
  };

  const handleFollow = async (e, type, sender_id, reciever_id) => {
    e.preventDefault();
    const payload = { sender_id, reciever_id };

    const response = await followFeature(payload, type);
    if (response.error) {
      toast.error("Some error occurred, please try again later");
      return;
    }

    if (type === "unfollow") {
      toast.success(`Unfollowed ${response.name}`);
      setFollowers(prev => prev.filter(id => id !== sender_id));
    } else {
      toast.success(`Started following ${response.name}`);
      setFollowers(prev => [...prev, sender_id]);
    }
  };

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
    <div className="post-cards" key={data._id}>
      <div className="post-user">
        <div className="post-username">
          <div className="user-logo-container">
            {type === "Posts" && <img className="userLogo" src={data.user_id.image[0]} alt="User" />}
            {type === "Events" && <img className="userLogo" src={data.user.image} alt="User" />}
            {type === "Rent" && <img className="userLogo" src={data.user.image} alt="User" />}
          </div>
          {type === "Posts" && <p>{data.user_id.name || "Unknown User"}</p>}
          {type === "Events" && <p>{data.user.name || "Unknown User"}</p>}
          {type === "Rent" && <p>{data.user.name || "Unknown User"}</p>}
        </div>

        <div className="post-follow">
          {user && user.user_id !== data.user_id._id && (
            followers.includes(user.user_id) ? (
              <button onClick={(e) => handleFollow(e, "unfollow", user.user_id, data.user_id._id)}>Unfollow</button>
            ) : (
              <button onClick={(e) => handleFollow(e, "follow", user.user_id, data.user_id._id)}>Follow</button>
            )
          )}
        </div>
      </div>

      <div className="post-caption">
        {type === "Posts" && <p>{data.caption}</p>}
        {type === "Events" && <p>{data.name}</p>}
        {type === "Rent" && <p>{data.model_name}</p>}
      </div>

      <div className="post-image">
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

      {type === "Posts" && (
        <div className="post-controls">
          <div className="post-like-btns">
            <button onClick={() => handledataLike(data._id)}>
              {!liked ? <TbArrowBigUp /> : <ImArrowUp />}
            </button>
            <p>{likeCount}</p>
          </div>
          <div>
            <button className="share-btn" onClick={handleShareClick}>
              Share <FaRegShareSquare />
            </button>
          </div>
        </div>
      )}

      {(type === "Events" || type === "Rent") && (
        <div className="post-controls">
          <button onClick={handleKnowMoreClick} className="know-more-btn">
            Know more
          </button>
          <div>
            <button className="share-btn">
              Share <FaRegShareSquare />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
