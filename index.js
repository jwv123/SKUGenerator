const express = require("express");
const db = require("./db/connector");
const codes = require("./db/model");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const main = await codes.findCode(codes.types.main, {});

    const shirt = await codes.findCode(codes.types.shirt, {});
    const trouser = await codes.findCode(codes.types.trouser, {});
    const belt = await codes.findCode(codes.types.belt, {});
    const underwear = await codes.findCode(codes.types.underwear, {});
    const sock = await codes.findCode(codes.types.sock, {});  
    const jersey = await codes.findCode(codes.types.jersey, {});
    const jacket = await codes.findCode(codes.types.jacket, {});

    const colour = await codes.findCode(codes.types.colour, {});
    const supplier = await codes.findCode(codes.types.supplier, {});
    const detail = await codes.findCode(codes.types.detail, {});

    res.render("index", { main, shirt, trouser, belt, underwear, sock, jersey, jacket, colour, supplier, detail });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.get("/generate", async (req, res) => {
    const main = await codes.findCode(codes.types.main, {});

    const shirt = await codes.findCode(codes.types.shirt, {});
    const trouser = await codes.findCode(codes.types.trouser, {});
    const belt = await codes.findCode(codes.types.belt, {});
    const underwear = await codes.findCode(codes.types.underwear, {});
    const sock = await codes.findCode(codes.types.sock, {});  
    const jersey = await codes.findCode(codes.types.jersey, {});
    const jacket = await codes.findCode(codes.types.jacket, {});

    const colour = await codes.findCode(codes.types.colour, {});
    const supplier = await codes.findCode(codes.types.supplier, {});
    const detail = await codes.findCode(codes.types.detail, {});

    res.render("generate", { main, shirt, trouser, belt, underwear, sock, jersey, jacket, colour, supplier, detail });
});

app.post("/generate/sku", (req, res) => {
    const data = req.body;
    const minSize = Number(data.minsize);
    const maxSize = Number(data.maxsize);

    const skuList = [];
    for(let i = minSize; i <= maxSize; i++) {
        let sizeCode = "";

        if(data.includexl === "on") {
            if(i === -2) {
               sizeCode = "000M";   
            } else if(i=== -1) {
                sizeCode = "000L";
            } else {
                sizeCode = "0" + i + "XL";
            }
            
        } else {
            sizeCode = i + "00";
            i++;
        }

        const sku = data.main + data.sub + data.colour + data.supplier + sizeCode + data.detail;
        skuList.push(sku);
    }
    res.render("sku", { skuList });
});

app.get('/new', (req, res) => {
    res.render("new");
});

app.post("/new/add", async (req, res) => {
    const {type, description, code} = req.body;
    const exists = await codes.findCode(codes.types[type], { "code": code });
    if(exists.length > 0) {
        res.render("notification", { notification: "Code already exists!"});
    } else {
        try {
            const newCode = codes.generateCode(codes.types[type], code, description);
            await newCode.save();
            res.render("notification", { notification: "Added new code!"});
        } catch(error) {
            res.render("notification", { notification: "Error saving new code to database." } );
            console.log(error);
        }
    }
});

app.get('/delete', (req, res) => {
    res.render("delete");
});

app.post("/delete/del", async (req, res) => {
    const { type, code } = req.body;
    try {
        const deletedCode = await codes.deleteCode(codes.types[type], { "code": code});
        if(deletedCode !== null) {
            res.render("notification", { notification: "Entry Removed"});
        } else {
            res.render("notification", { notification: "Couldn't find entry to remove"});
        }
    } catch(error) {
        res.render("notification", { notification: "Error removing entry"});
        console.log(error);
    }
});
db.connect(app.listen(3000, () => {
    console.log("Server running on port 3000");
}));
