import { useState } from "react";

function CommunityDisplay() {
    const [seeMoreCommunities,setSeeMoreCommunities] = useState(false);
    const handleSeeMoreClick = () => {
        if(seeMoreCommunities) {
            setSeeMoreCommunities(false);
        }else {
            setSeeMoreCommunities(true);
        }
    }
    return (
    <div className="community-container">
      <div className="community-display-box">
        <p>Popular Communties</p>
        <button className="community-display-box-btn"></button>
        <button className="community-display-box-btn"></button>
        <button className="community-display-box-btn" style={{color:"white"}}>Feature coming soon</button>
        <button className="community-display-box-btn"></button>
        <button className="community-display-box-btn"></button>
        {seeMoreCommunities && (
            <div>
                        <button className="community-display-box-btn"></button>
            <button className="community-display-box-btn"></button>
            <button className="community-display-box-btn"></button>

            </div>
        )}
                <button id="see-more-btn" onClick={handleSeeMoreClick}>
                    {seeMoreCommunities ? "See less":"See more"}
                    </button>

      </div>
    </div>
  );
}
export default CommunityDisplay;
