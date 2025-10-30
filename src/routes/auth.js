const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {validateSignUpData, validateLoginData} = require('../utils/validation')
const jwt = require("jsonwebtoken");


authRouter.post("/signup", async (req,res)=> {
    try {
        //validation of data(req.body)
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        //Encrypting the password using bcrypt
        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);

        //creating new instance of the User
         const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });

    await user.save();
    res.send("User signed up");
    }
    catch( err)  {
        console.log("Error in saving user");
        res.status(400).send("ERROR : "+ err.message);
    }
})
//login API
authRouter.post("/login", async(req,res)=> {
    try{
        validateLoginData(req);
      const {emailId, password}= req.body;
       const user = await User.findOne({emailId: emailId});
       if(!user){
        throw new Error("Invalid Credentials");
       }
       const isPasswordMatch = await user.validatePassword(password);
       if(!isPasswordMatch){
        throw new Error("Invalid Credentials")
       }
       else{
        const token = user.getJWT();
  res.cookie("token", token, {
  expires: new Date(Date.now() + 78 * 3600000),
  httpOnly: true
});

        res.send("User logged in successfully");
       }
    }
    catch(err){
        res.status(400).send("Error in login: " + err.message);
    }
    
})

authRouter.post("/logout", async(req,res)=> {
    res
    .cookie("token", null, {
        expires: new Date(Date.now()),
    })
    .send("User logged out successfully");
})

module.exports = authRouter;