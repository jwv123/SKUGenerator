const { Schema } = require("mongoose");

const skuSchema = new Schema({
    code: String,
    description: String,
});

module.exports = { skuSchema }