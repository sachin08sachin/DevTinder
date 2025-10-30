 
const validator = require("validator");
const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(! firstName || !lastName ) {
        throw new Error("All fields are required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email address is not valid: " + emailId);
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password: " + password);
    }
}
const validateLoginData = (req) => {
    const {emailId, password} = req.body;
    if(!emailId || !password) {
        throw new Error("All fields are required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email address is not valid: " + emailId);
    }

}

const validateEditProfileData = (req) => {
    const allowedEditFields = ['firstName', 'lastName', 'emailId','age', 'gender', 'photoUrl', 'about', 'skills'];
    const isEditAllowed = Object.keys(req.body).every( field => allowedEditFields.includes(field));
    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateLoginData,
    validateEditProfileData,
}