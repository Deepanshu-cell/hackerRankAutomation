// requiring mongoose
const mongoose = require("mongoose");

// creating database
mongoose.connect("mongodb://localhost:27017/deepanshudb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Succesfully done");
}).catch((error) => {
    console.log(error);
})