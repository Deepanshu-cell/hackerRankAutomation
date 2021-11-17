const mongoose = require("mongoose");
const validator = require("validator");

// Creating schema -> design of database that fields does database gone have like name , email , number ,etc and validating it 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email id");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    message: {
        type: String,
        required: true,
        minLength: 3
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// we need a collection
const User = mongoose.model("User", userSchema);


// Exporting collection(User) 
module.exports = User;
