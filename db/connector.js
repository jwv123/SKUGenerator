require("dotenv").config();
const mongoose = require("mongoose");


const connect = async (f, listen) => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Connected to database");
        listen();
    } catch(error) {
        console.log(error);
    }
}

module.exports = { connect };
