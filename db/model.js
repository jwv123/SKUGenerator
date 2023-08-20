const { model } = require("mongoose");
const { skuSchema } = require("./schema");

//Main Code
const MainCode = new model("Main", skuSchema);

//Sub Codes
const shirtCode = new model("Shirt", skuSchema);
const trouserCode = new model("Trouser", skuSchema);
const beltCode = new model("Belt", skuSchema);
const sockCode = new model("Sock", skuSchema);
const underwearCode = new model("Underwear", skuSchema);
const jerseyCode = new model("Jersey", skuSchema);
const jacketCode = new model("Jacket", skuSchema);

//Colour Code
const ColourCode = new model("Colour", skuSchema);

//Supplier Code
const SupplierCode = new model("Supplier", skuSchema);

//Details of Product code (Cotton, polyester, etc.)
const DetailsCode = new model("Detail", skuSchema);

const codeTypes = {
    "main": MainCode,
    "shirt": shirtCode,
    "trouser": trouserCode,
    "belt": beltCode,
    "sock": sockCode,
    "underwear": underwearCode,
    "jersey": jerseyCode,
    "jacket": jacketCode,
    "colour": ColourCode,
    "supplier": SupplierCode,
    "detail": DetailsCode
}

module.exports = {
    generateCode: function(type, code, description) {
        return new type({"code": code, "description": description});
    },
    clearDB: async function() {
        await MainCode.deleteMany({});
        await shirtCode.deleteMany({});
        await trouserCode.deleteMany({});
        await beltCode.deleteMany({});
        await sockCode.deleteMany({});
        await underwearCode.deleteMany({});
        await jerseyCode.deleteMany({});
        await jacketCode.deleteMany({});
        await ColourCode.deleteMany({});
        await SupplierCode.deleteMany({});
        await DetailsCode.deleteMany({});
    },
    findCode: async function(type, query) {
        return type.find(query);
    },
    deleteCode: async function(type, query) {
        return type.findOneAndDelete(query);
    },
    types: codeTypes
}