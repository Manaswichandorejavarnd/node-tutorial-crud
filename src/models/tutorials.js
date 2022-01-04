const mongoose = require("mongoose");
const validator = require("validator");

const tutorialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: [true, "Email is already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    subject:{
        type: String,
        required: true,
        minlength: 3
    }
}) 

// craete new collection
const Tutorial = new mongoose.model('Tutorial',tutorialSchema);

module.exports = Tutorial;
