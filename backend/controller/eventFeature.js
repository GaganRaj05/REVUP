const Events = require("../models/Events");

async function uploadEvent(req,res) {
    try {
        const user_id = req.user_id;
        const {name,event_type,description,venue, date,location,time} = req.body;

        const imagePaths = req.files ? req.files.map(file => file.path.replace(/\\/g, "/").replace(/^uploads\//, "")) : [];

        await Events.create({
            user:user_id,
            name:name,
            image:imagePaths,
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
        const formattedResults  = result.map(event=> ({
            ...event._doc,
            image:event.image.map(img=>`${req.protocol}://${req.get("host")}/upload/${img}`)
        }));
        return res.status(201).json(formattedResults);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

module.exports = {getEvents,uploadEvent};