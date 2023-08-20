const db = require("./connector");
const list = require("./model");
const codes = require("./codes");

const generate = async (type, obj) => {
    for(let o of obj) {
        try {
            const item = list.generateCode(type, o.key, o.value);
            await item.save();
        } catch(error) {
            console.log(error);
        }
    }
    
}

const seedDB = async() => {
    //Wait for connection to be establised and clearing the DB before seeding
    await db.connect();
    await list.clearDB();
    generate(list.types.main, codes.mainCodes);
    generate(list.types.shirt, codes.shirtCodes);
    generate(list.types.trouser, codes.trouserCodes);
    generate(list.types.belt, codes.beltCodes);
    generate(list.types.sock, codes.sockCodes);
    generate(list.types.underwear, codes.underwearCodes);
    generate(list.types.jersey, codes.jerseyCodes);
    generate(list.types.jacket, codes.jacketCodes);
    generate(list.types.colour, codes.colourCodes);
    generate(list.types.supplier, codes.supplierCodes);
    generate(list.types.detail, codes.detailCodes);
    console.log("Default codes seeded to database");
}

seedDB();
