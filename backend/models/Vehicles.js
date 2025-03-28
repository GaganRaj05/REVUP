const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    model_name: {
        type:String,
        required:true
    },  
    image:{
        type:[String],
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    contact_info:{
        type:String,
        required:true,
    },
    address: {
        type:String,
        required:true,
    }
});

const Vehicle = mongoose.model("vehicles",vehicleSchema);

module.exports = Vehicle;