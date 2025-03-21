const Posts = require("../models/Posts");

async function handlePostUploads(req, res) {
    try {
        const user_id = req.user_id;
        const {image,caption} = req.body;
        console.log(image,caption)

        const imagesArray = Array.isArray(image) ? image : [image];
        console.log(imagesArray)
        await Posts.create({
            user_id: user_id,
            image: imagesArray,
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
        const result = await Posts.find();
        return res.status(201).json({result});
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
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