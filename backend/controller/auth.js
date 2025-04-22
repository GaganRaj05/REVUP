const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jsonwebtoken = require("jsonwebtoken")
const cloudinary = require('../config/cloudinaryConfig');
const bufferToStream = require("../utils/bufferToStream");


async function handleLogin(req, res) {
    try {
        console.log("working")
        const {email, password} = req.body;
        const user = await User.findOne({email_id:email})
        if(!user) return res.status(400).json("Email not found in the db, please register");

        const result = await bcrypt.compare(password,user.password);

        if(!result) return res.status(401).json("Incorrect password entered");

        const jwt = jsonwebtoken.sign({user_id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});

        res.cookie("jwt",jwt,{
            httpOnly:false,
            secure:false,
            sameSite:"lax",
            path:"/"
        });
        console.log("Cookie Set:", res.getHeaders()["set-cookie"]);

        return res.status(201).json({msg:"Login Succesfull", data:{name:user.name, email:user.email_id, image:user.image}});

    }
    catch(err) {
        console.log(err);
        return res.status(501).json("Internal server error")
    }
}
async function handleRegistration(req, res) {
    try {
        const {name,phone,email,password } = req.body;
        console.log(password)
        const phoneExists = await User.findOne({phone_number:phone});
        if(phoneExists) return res.status(401).json("User exists with the given phone number, choose another number");
        
        const emailExists = await User.findOne({email_id:email})
        if(emailExists) return res.status(401).json("user exists with this email please choose another email");

        const nameExists = await User.findOne({name:name});
        if(nameExists) return res.status(401).json("Username taken please choose another username");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const imageFiles = req.files.image;
        const uploadImage = imageFiles.map(async (imageFile)=> {
            return new Promise((resolve, reject)=> {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder:"REVUP/user_images/",
                        resource_type:"image"
                    },
                    (err,result)=> {
                        if(err) reject(err);
                        else resolve(result);
                    }
                )
                bufferToStream(imageFile.buffer).pipe(stream);
            });
        })
        const uploadResults = await Promise.all(uploadImage);
        const imageUrls = await uploadResults.map(result=>result.secure_url);
        await User.create({
            name:name,
            phone_number:phone,
            email_id:email,
            password:hashedPassword,
            image:imageUrls
        })

        return res.status(201).json("account created successfully")

    }
    catch(err) {
        console.log(err);
        return res.status(501).json("Internal server error");
    }
}

async function handleLogout(req, res) {
    try {
        res.clearCookie("jwt",{
            httpOnly:false,
            secure:false,
            sameSite:"lax",
            path:"/"
        });
        return res.status(201).json("Logout successfull");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Internal server error");
    }
}


const checkAuth = async (req, res)=> {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(400).json("Not logged In");
        }
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findOne({_id:decoded.user_id});

        return res.status(200).json({msg:"Already logged in", data:{name:user.name, email:user.email_id, image:user.image}});
    }
    catch(err) {
        if(err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Session expired. Please re-login." });
        }
      
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

module.exports = {handleLogin, handleRegistration, handleLogout, checkAuth}