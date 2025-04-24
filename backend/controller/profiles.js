const User = require("../models/User");
const Posts = require("../models/Posts");
const Vehicle = require("../models/Vehicles");
const Events = require("../models/Events");
async function getProfile(req, res) {
    try {
        const user_id = req.query.search;
        console.log(user_id)
        const user = await User.findOne({_id:user_id});
        const posts = await Posts.find({user_id:user_id});
        const vehicles = await Vehicle.find({user:user_id});
        const events = await Events.find({user:user_id});
        const result = {
            user:{name:user.name,followers_count:user.followers.length, following_count:user.following.length,posts_count:posts.length, image:user.image},
            posts,
            vehicles,
            events
        }
        return res.status(200).json(result);
    }   
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}
module.exports = getProfile;