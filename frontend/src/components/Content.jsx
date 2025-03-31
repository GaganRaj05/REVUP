import { useEffect, useState } from "react";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { FaRegShareSquare } from "react-icons/fa";
import Get_Posts from "../services/posts";
import Like from "../services/like";

function Content({type}) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPosts() {
      const response = await Get_Posts();
      if (response.error) {
        setError(response.error === "Failed to fetch" ? "Some error occurred, please try again later" : response.error);
        return;
      }
      if(response.length === 0) {setError("No posts found"); return;}
      setPosts(response);
    }
    getPosts();
  }, []);

  const handlePostLike = async(post_id)=> {
    const response = await Like(post_id);
    if(response.error) {
      setError(response.error === "Failed to fetch" ? "Some error occured please try again later":response.error);
      return;
    }
    alert("liked");

  }
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  return (
    <div className="Content-section">
      { error && <p style={{color:"white",fontFamily:"sans-serif",fontSize:"30px"}} className="error-msg">{error}</p>}

      {(type==="" || type==="Posts") && posts.map((post) => (
        <div className="post-cards" key={post._id}>
          <div className="post-user">
            <div className="post-username">
              <div className="user-logo-container">
                <img className="userLogo" src={post.user_id.image} alt="User" />
              </div>
              <p>{post.user_id._doc.name || "Unknown User"}</p>
            </div>
            <div className="post-follow">
              <button>Follow</button>
            </div>
          </div>

          <div className="post-caption">
            <p>{post.caption}</p>
          </div>

          <div className="post-image">
            {post.image.length === 1 ? (
              <img src={post.image[0]} alt="Post" />
            ) : (
              <Slider {...carouselSettings}>
                {post.image.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt={`Post ${index}`} className="carousel-img" />
                  </div>
                ))}
              </Slider>
            )}
          </div>

          <div className="post-controls">
            <div className="post-like-btns">
              <button onClick={()=>handlePostLike(post._id)}><TbArrowBigUp /></button>
              <p>{post.like_count}</p>
              <button><TbArrowBigDown /></button>
            </div>
            <div>
              <button className="share-btn">Share <FaRegShareSquare /></button>
            </div>
          </div>
        </div>
      ))}
      {type === "Rent" && (
        <div>
          <p style={{color:"white"}}>RENT</p>
        </div>
      )}
      {type === "Events" && (
        <div>
          <p style={{color:"white"}}>events</p>
        </div>
      )}
    </div>
  );
}

export default Content;
