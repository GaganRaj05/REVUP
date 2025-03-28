import React, { useEffect, useState } from "react";
import "../assets/styles/postform.css";
import Get_Posts from "../services/post";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";
import Like_Click from "../services/like";

function Postform() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const handleLikeClick = async(post_id)=> {
    console.log(post_id)
    const response = await Like_Click({post_id});
    if(response.error) {
      if(response.error === "Login to use this feature") {
        alert("Login to use this feature");
        return;
      }
      setError(response.error === "Failed to fetch" ? "Some error occurred. Please try again later." : response.error);
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === post_id ? { ...post, like_count: post.like_count + 1 } : post
      )
    );

  }
  useEffect(() => {
    async function getPost() {
      try {
        const response = await Get_Posts();
        if (response.error) {
          throw new Error(
            response.error === "Failed to fetch"
              ? "Some error occurred. Please try again later."
              : response.error
          );
        }
        console.log("fetched posts", response.error);
        setPosts(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getPost();
  }, [2]);

  return (
    <div>
      {isLoading && <p>Loading.. Please wait</p>}
      {error && <p>{error}</p>}
      <h2 style={{ marginLeft: "310px" }}>Posts that you may like</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post._id}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="post-header"
            >
              <img
                style={{ height: "25px", borderRadius: "25px" }}
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt={post.user_id.name}
                className="profile-pic"
              />
              <span style={{ margin: "10px" }} className="username">
                {post.user_id.name}
              </span>
            </div>
            {post.image.length > 0 ? (
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                useKeyboardArrows
              >
                {post.image.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`Slide ${index}`}
                      className="post-image"
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <p>No Image</p>
            )}

            <div className="post-actions">
              <button className="action-button" onClick={()=>handleLikeClick(post._id)}>
                <FaHeart className="icon" /> {post.like_count}
              </button>

              <button style={{ marginLeft: "15px" }} className="action-button">
                <FaShare className="icon" /> Share
              </button>
            </div>
            <div className="post-footer">
              {post.caption && <p className="caption">{post.caption}</p>}
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default Postform;
