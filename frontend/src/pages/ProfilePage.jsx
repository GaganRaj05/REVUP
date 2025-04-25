import "../assets/styles/ProfilePage.css";
import Logo from "../assets/searchIcon.png";
import { useEffect, useState } from "react";
import UploadForms from "../components/ReusableUploadForms";
import { useLocation } from "react-router-dom";
import getProfileInfo from "../services/getProfileInfo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DeleteForms from "../components/DeleteForm";

export default function ProfilePage() {
  const [deleteData, setDeleteData] = useState({ type: null, item: null });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [activeTab, setActiveTab] = useState("Posts");
  const [userInfo, setUserInfo] = useState({
    user: {},
    posts: [],
    vehicles: [],
    events: [],
  });
  const location = useLocation();
  const { user_id } = location.state;
  const navigate = useNavigate();
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    className: "profile-custom-slider",
  };

  useEffect(() => {
    async function fetchProfile() {
      const response = await getProfileInfo(user_id);
      if (response.error) {
        toast.error("Some error occured please try again later");
        navigate("/");
        return;
      }
      setUserInfo(response);
    }
    fetchProfile();
  }, []);

  
  const handleBtnClick = (e, type) => {
    e.preventDefault();
    setFormType(type);
    console.log(type)
    setIsFormOpen(true);
  };
  const handleCtrlBtnClick = (e, type) => {
    e.preventDefault();
    setActiveTab(type);
  };
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src={userInfo.user.image} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="profile-username">
            <h2>{userInfo?.user?.name}</h2>
          </div>
          <div className="profile-stats">
            <span>
              <strong>{userInfo?.user?.posts_count || 0}</strong> posts
            </span>
            <span>
              <strong>{userInfo?.user?.followers_count || 0}</strong> followers
            </span>
            <span>
              <strong>{userInfo?.user?.following_count || 0}</strong> following
            </span>
          </div>
          <div className="profile-bio">
            <button onClick={(e) => handleBtnClick(e, "Post")}>Add Post</button>
            <button onClick={(e) => handleBtnClick(e, "Event")}>
              Add Event
            </button>
            <button onClick={(e) => handleBtnClick(e, "Vehicle")}>
              Add Vehicle
            </button>
          </div>
        </div>
      </div>

      <hr className="divider" />
      <div className="upload-controls">
        <button
          className={activeTab === "Posts" ? `active` : ""}
          onClick={(e) => handleCtrlBtnClick(e, "Posts")}
        >
          Posts
        </button>
        <button
          className={activeTab === "Events" ? `active` : ""}
          onClick={(e) => handleCtrlBtnClick(e, "Events")}
        >
          Events
        </button>
        <button
          className={activeTab === "Vehicles" ? `active` : ""}
          id="br-ntr"
          onClick={(e) => handleCtrlBtnClick(e, "Vehicles")}
        >
          Vehicles
        </button>
      </div>
      <div className="post-grid">
        

        {activeTab === "Posts" &&
          userInfo.posts.map((post) => (
            <div key={post._id} className="post-box">
              <button
                className="delete-btn"
                onClick={() => setDeleteData({ type: "Posts", item: post })}
              >
                Delete
              </button>

              {Array.isArray(post.image) && post.image.length > 0 ? (
                <Slider {...carouselSettings}>
                  {post.image.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img}
                        alt={`Post ${index}`}
                        className="carousel-img"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img src={post.image} alt="Post" />
              )}
            </div>
          ))}
        {activeTab === "Events" &&
          userInfo.events.map((event) => (
            <div key={event._id} className="post-box">
              <button
                className="delete-btn"
                onClick={() => setDeleteData({ type: "Events", item: event })}
              >
                Delete
              </button>

              {Array.isArray(event.image) && event.image.length > 0 ? (
                <Slider {...carouselSettings}>
                  {event.image.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img}
                        alt={`Post ${index}`}
                        className="carousel-img"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img src={event.image} alt="Post" />
              )}
            </div>
          ))}
        {activeTab === "Vehicles" &&
          userInfo.vehicles.map((vehicle) => (
            <div key={vehicle._id} className="post-box">
              <button
                className="delete-btn"
                onClick={() => setDeleteData({ type: "Vehicles", item: vehicle })}
              >
                Delete
              </button>

              {Array.isArray(vehicle.image) && vehicle.image.length > 0 ? (
                <Slider {...carouselSettings}>
                  {vehicle.image.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img}
                        alt={`Post ${index}`}
                        className="carousel-img"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img src={vehicle.image} alt="Post" />
              )}
            </div>
          ))}
      </div>
      {isFormOpen && (
        <UploadForms type={formType} onClose={() => setIsFormOpen(false)} />
      )}
      {deleteData.item && (
        <DeleteForms
          formType={`${deleteData.type}`}
          item={deleteData.item}
          onClose={() => setDeleteData({ type: null, item: null })}
          onDeleteSuccess={(deletedItemId) => {
            setUserInfo((prev) => ({
              ...prev,
              [deleteData.type.toLowerCase()]: prev[deleteData.type.toLowerCase()].filter(
                (item) => item._id !== deletedItemId
              ),
            }));
          }}
        
        />
      )}
    </div>
  );
}
