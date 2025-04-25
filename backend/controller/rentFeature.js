const Vehicle = require("../models/Vehicles")
const cloudinary = require("../config/cloudinaryConfig");
const bufferToStream = require("../utils/bufferToStream");
async function uploadVehicle(req, res) {
    try {
        const user_id = req.user_id;
        const { model_name, description, price, contact_info, address } = req.body;

        const imageFiles = req.files.image;
        console.log(imageFiles)

        const uploadImage = imageFiles.map((imageFile)=> {
            return new Promise( (resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder:"REVUP/vehicles/images",
                        resource_type:"auto"
                    },
                    (err, result) => {
                        if(err) reject(err);
                        else resolve(result);
                    }
                );
                bufferToStream(imageFile.buffer).pipe(stream);
            });
        })
        const uploadResult = await Promise.all(uploadImage);
        const imageUrls = await uploadResult.map(result => result.secure_url);


        await Vehicle.create({
            user: user_id,
            model_name: model_name,
            image: imageUrls,  
            description: description,
            price: price,
            contact_info: contact_info,
            address: address,  
        });

        return res.status(201).json("Vehicle uploaded successfully");
    }   
    catch(err) {
        console.error(err.message);
        return res.status(500).json("Some error occurred, please try again later");
    }
}

const getRentalVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate({path:"user",select:"name image"});
        return res.status(200).json(vehicles);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: "Some error occurred, please try again later" });
    }
};

const handleDeletingVehicles = async (req, res)=> {
    try {
        const vehicle_id = req.query.vehicle_id;
        await Vehicle.findOneAndDelete({_id:vehicle_id});
        return res.status(200).json("Vehicle Deleted successfully");
    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json("Some error occured please try again later");
    }
}

module.exports = {uploadVehicle,getRentalVehicles, handleDeletingVehicles};
