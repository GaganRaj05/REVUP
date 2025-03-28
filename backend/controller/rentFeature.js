const Vehicle = require("../models/Vehicles")

async function uploadVehicle(req, res) {
    try {
        const user_id = req.user_id;
        const {model_name,description,price,contact_info,address} = req.body;

        const imagePath = req.file ? req.file.path.replace(/\\/g, "/").replace(/^uploads\//, "") : null;
        console.log("working")
        await Vehicle.create({
            user:user_id,
            model_name:model_name,
            image:imagePath,
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

const getRentalVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();

        const formattedVehicles = vehicles.map(vehicle => ({
            ...vehicle._doc,
            image: `${req.protocol}://${req.get("host")}/uploads/${vehicle.image}`
        }));

        return res.status(200).json(formattedVehicles);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: "Some error occurred, please try again later" });
    }
};

module.exports = {uploadVehicle,getRentalVehicles};
