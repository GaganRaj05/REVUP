const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jsonwebtoken = require("jsonwebtoken")


async function handleLogin(req, res) {
    try {
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

        return res.status(201).json("login successfull");

    }
    catch(err) {
        console.log(err.message);
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
        const imagePath = req.file? req.file.path.replace(/\\/g,"/").replace(/^uploads\//,""):"default.jpg";
        await User.create({
            name:name,
            phone_number:phone,
            email_id:email,
            password:hashedPassword,
            image:imagePath
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

module.exports = {handleLogin, handleRegistration, handleLogout}