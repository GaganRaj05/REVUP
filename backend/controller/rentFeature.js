const Vehicle = require("../models/Vehicles")

async function uploadVehicle(req, res) {
    try {
        const user_id = req.user_id;
        const {image,description,price,contact_info,address} = req.body;

        const imageArray = Array.isArray(image) ? image:[image];

        await Vehicle.create({
            user:user_id,
            image:imageArray,
            description:description,
            price:price,
            contact_info:contact_info,
            address:address,  
        })
        return res.status(201).json("Vehicle uploaded");
    }   
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function getRentalVehicles(req,res) {
    try {
        const result = await Vehicle.find();
        return res.status(201).json(result);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

module.exports = {uploadVehicle,getRentalVehicles};
