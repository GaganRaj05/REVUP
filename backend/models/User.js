const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    phone_number:{
        type:String,
        required:true,
        unique:true
    },
    email_id: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String, 
        required:true,
    },
    image:{
        type:[String],
        default:["default.jpg"]
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }],
    followers_count: {
        type:Number,
        default:0
    }
})

const User = mongoose.model("users",userSchema);

module.exports = User;