const mongoose = require('mongoose');

async function connectToDB(url) {
    try {
        await mongoose.connect(url)
        console.log("Mongo db connection successfull")
    }
    catch(err) {
        console.log(err.message);
        console.log("some error occured while connecting to the db");
    }
}

module.exports = connectToDB;