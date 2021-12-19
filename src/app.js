
/*
The Aim of this project is to make a webiste with database using mongodb
*/


const express = require("express");
const path = require("path");
const hbs = require("hbs");
// requiring database file(conn.js)
require("./db/conn");
const User = require("./models/usermessage");

const app = express();
const port = process.env.PORT || 3000;

// setting path
const staticpath = path.join(__dirname, "../views");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

// middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);


// routing
// app.get(path, callback)
app.get("/", (req, res) => {
    res.render("login");
})
app.get("/index", (req, res) => {
    res.render("index");
})


// getting the user data 
app.post("/contact", async (req, res) => {
    try {
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }
    catch {
        res.status(500).send(error);
    }
})


// Server create 
// app.listen(port , callback)
app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})