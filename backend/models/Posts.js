const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    image:{
        type:[String],
        required:true
    },
    like_count:{
        type:Number,
        default:0
    },
    caption:{
        type:String,
        default:null,
    }
})

const Posts = mongoose.model("posts",postSchema);

module.exports = Posts;