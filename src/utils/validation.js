 
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

module.exports = {
    validateSignUpData,
    validateLoginData,
}