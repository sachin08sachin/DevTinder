const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email adddress is not valid:" + value);
            }
        }
    },
    password: {
        type: String,
        password: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password:" + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-Male-Transparent.png",
            validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL:" + value);
            }
        }
    },
    about: {
        type: String,
        default: "Hey there! I am using DevTinder",
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model("User", userSchema);