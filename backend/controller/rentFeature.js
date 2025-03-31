const Vehicle = require("../models/Vehicles")

async function uploadVehicle(req, res) {
    try {
        const user_id = req.user_id;
        const { model_name, description, price, contact_info, address } = req.body;

        const imagePaths = req.files ? req.files.map(file => file.path.replace(/\\/g, "/").replace(/^uploads\//, "")) : [];

        console.log("Files uploaded:", imagePaths);

        await Vehicle.create({
            user: user_id,
            model_name: model_name,
            image: imagePaths,  
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
        const vehicles = await Vehicle.find();

        const formattedVehicles = vehicles.map(vehicle => ({
            ...vehicle._doc,
            image: vehicle.image.map(img => `${req.protocol}://${req.get("host")}/uploads/${img}`)
        }));

        return res.status(200).json(formattedVehicles);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: "Some error occurred, please try again later" });
    }
};

module.exports = {uploadVehicle,getRentalVehicles};
