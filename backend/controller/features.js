const Posts = require("../models/Posts");

async function handlePostUploads(req, res) {
    try {
        const user_id = req.user_id;
        const {caption} = req.body;
        
        const imagePath = req.files ? req.files.map(file=>file.path.replace(/\\/g,'/').replace(/^uploads\//,"")):[];
        
        await Posts.create({
            user_id: user_id,
            image: imagePath,
            caption: caption,
        });

        return res.status(201).json("Post successfull");
    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json("Some error occured please try again later");
    }
}

async function handleGettingPosts(req, res) {
    try {
        const result = await Posts.find().populate({ path: "user_id", select: "name image" });
        const formattedResults = result.map(post => ({
            ...post._doc,
            user_id: {
                ...post._doc.user_id,
                image: `${req.protocol}://${req.get("host")}/uploads/${post.user_id.image}`
            },
            image: post.image.map(img => `${req.protocol}://${req.get("host")}/uploads/${img}`)
        }));

        return res.status(200).json(formattedResults);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json("Some error occurred, please try again later.");
    }
}

async function handlePostLike(req, res) {
    try {
        const {post_id} = req.body;
        await Posts.findOneAndUpdate({_id:post_id},{$inc:{like_count:1}})
        return res.status(201).json("Liked")
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later")
    }
}

module.exports = {handlePostUploads,handleGettingPosts,handlePostLike}