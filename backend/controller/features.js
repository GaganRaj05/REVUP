const Posts = require("../models/Posts");
const cloudinary = require("../config/cloudinaryConfig");
const bufferToStream = require("../utils/bufferToStream");
const User = require("../models/User");

async function handlePostUploads(req, res) {
    try {
        const user_id = req.user_id;
        const {caption} = req.body;
        const imageFiles = req.files.image;
        

        const uploadPromises = await imageFiles.map(async (imageFile)=> {
            return new Promise((resolve, reject)=> {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder:"REVUP/posts/images",
                        resource_type:"auto"
                    },
                    (err,result)=> {
                        if(err) reject(err);
                        else resolve(result);
                    }
                );
                bufferToStream(imageFile.buffer).pipe(stream);
            })
        })
        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);
        await Posts.create({
            user_id: user_id,
            image: imageUrls,
            caption: caption,
        });

        return res.status(201).json("Post successfull");
    }
    catch(err) {
        console.log(err);
        return res.status(500).json("Some error occured please try again later");
    }
}

async function handleDeletingPosts(req, res) {
    try {
        const post_id = req.query.post_id;
        await Posts.findOneAndDelete({_id:post_id});
        return res.status(200).json("Post deleted successfully");
    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json("Some error occured please try again later");
    }
}
async function handleFollowRequest(req, res) {
    try {
        const {sender_id, reciever_id } = req.body;
        
        const sender = await User.findOne({_id:sender_id});
        const reciever = await User.findOne({_id:reciever_id});

        sender.following.push(reciever_id);
        sender.save();
        reciever.followers.push(sender_id);
        reciever.save();

        return res.status(200).json({msg:"Successfull", name:reciever.name});
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function handleUnfollowRequest(req, res) {
    try {
        const {sender_id, reciever_id} = req.body;
        await User.findByIdAndUpdate(sender_id, {
            $pull:{following:reciever_id}
        });
        const reciever = await User.findByIdAndUpdate(reciever_id, {
            $pull:{followers:sender_id}
        });
        return res.status(200).json({msg:"Successfull",name:reciever.name})
    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json("Some error occured please try again later")
    }
}

async function handleGettingPosts(req, res) {
    try {
        const result = await Posts.find().populate({ path: "user_id", select: "name image followers following" });

        return res.status(200).json(result);
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

module.exports = {handlePostUploads,handleGettingPosts,handlePostLike, handleDeletingPosts, handleFollowRequest, handleUnfollowRequest};