const Events = require("../models/Events");
const cloudinary = require("../config/cloudinaryConfig");
const bufferToStream = require('../utils/bufferToStream');
async function uploadEvent(req,res) {
    try {
        const user_id = req.user_id;
        const {name,event_type,description,venue, date,location,time} = req.body;

        const imageFiles = req.files.image;
        const uploadImage = imageFiles.map((image)=> {
            return new Promise( (resolve, reject)=> {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder:"REVUP/events/images",
                        resource_type:'auto',
                    },
                    (err, result)=> {
                        if(err) reject(err);
                        else resolve(result);
                    }
                );
                bufferToStream(image.buffer).pipe(stream);
            })
        });
        const uploadResult = await Promise.all(uploadImage);
        const imageUrls = await uploadResult.map(result=>result.secure_url);
        await Events.create({
            user:user_id,
            name:name,
            image:imageUrls,
            event_type:event_type,
            description:description,
            venue:venue,
            location:location,
            time:time
        });
        return res.status(201).json("Event uploaded");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function getEvents(req, res) {
    try {
        const result = await Events.find().populate({path:"user",select:"name phone_number image"});
        
        return res.status(201).json(result);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

module.exports = {getEvents,uploadEvent};