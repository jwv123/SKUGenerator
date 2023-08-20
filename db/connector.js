require("dotenv").config();
const mongoose = require("mongoose");


const connect = async (f) => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Connected to database");
        f();
    } catch(error) {
        console.log(error);
    }
}

module.exports = { connect };
