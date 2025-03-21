const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:["String"],
        required:true
    },
    event_type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:null,
    },
    location:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true
    }

})

const Events = mongoose.model("events",eventsSchema);

module.exports = Events;