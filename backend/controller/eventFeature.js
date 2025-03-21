const Events = require("../models/Events");

async function uploadEvent(req,res) {
    try {
        const user_id = req.user_id;
        const {name,image,event_type,description,venue, date,location,time} = req.body;

        const imageArray = Array.isArray(image) ? image:[image];

        await Events.create({
            user:user_id,
            name:name,
            image:imageArray,
            event_type:event_type,
            description:description,
            venue:venue,
            date:date,
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
        const result = await Events.find();
        return res.status(201).json(result);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

module.exports = {getEvents,uploadEvent};