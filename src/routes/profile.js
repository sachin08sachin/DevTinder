const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const {validateEditProfileData} = require('../utils/validation');
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view",userAuth, async (req,res) => {
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req,res)=> {
    try{
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid fields in edit profile");
        }
    
            const loggedInUser = req.user;
            console.log("Logged in user before edit: ", loggedInUser);
            Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
            console.log("Logged in user after edit: ", loggedInUser);
            await loggedInUser.save();
            res.json({
                 message:`${loggedInUser.firstName}, Profile updated successfully`,
                 data: loggedInUser});
        
    }
    catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }
})


profileRouter.patch("/profile/resetpassword", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    // Confirm required fields
    if (!oldPassword || !newPassword) {
      return res.status(400).send("Both old and new passwords are required.");
    }

    // Check old password
    const isMatch = await req.user.validatePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).send("Old password is incorrect.");
    }

    // Validate new password strength
    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).send("New password does not meet strength requirements.");
    }

    // Hash and update
    req.user.password = await bcrypt.hash(newPassword, 10);
    await req.user.save();

    res.send("Password updated successfully.");
  } catch (err) {
    res.status(500).send("Error updating password: " + err.message);
  }
});


module.exports = profileRouter;