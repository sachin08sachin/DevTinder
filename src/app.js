const express = require('express');
const connectDB = require('./config/database');
const app = express();
app.use(express.json());
const User = require('./models/user');
const bcrypt = require('bcrypt');
const {validateSignUpData, validateLoginData} = require('./utils/validation')

app.post("/signup", async (req,res)=> {
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
app.post("/login", async(req,res)=> {
    try{
        validateLoginData(req);
      const {emailId, password}= req.body;
       const user = await User.findOne({emailId: emailId});
       if(!user){
        throw new Error("Invalid Credentials");
       }
       const isPasswordMatch = await bcrypt.compare(password, user.password);
       if(!isPasswordMatch){
        throw new Error("Invalid Credentials")
       }
       else{
        res.send("User logged in successfully");
       }
    }
    catch(err){
        res.status(400).send("Error in login: " + err.message);
    }
    
})
//GET user by emailId 
app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId: userEmail});
        if(users.length === 0){
            res.status(404).send("User not found");
        }
        res.send(users);
    }
    catch(err) {
        res.status(400).send("Error in fetching user");
    }
})
//FEED API - GET / FEED get all users from dtatabase
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
})
//if  two users have same mailId -> gives an object not an array
app.get("/user", async(req,res) => {
    const userEmail = req.body.emailId;
    try{
        const users = await User.findOne({emailId: userEmail});
        if(!users){
            res.status(404).send("user not found");
        }
        res.send(users);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
})
//findbyID
app.post("/user", async(req,res) => {
     const id = req.body._id;
    try{
        const user = await User.findById(id);
        if(!user){
            res.status(404).send("userId not found");
        }
        res.send(user);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
})
//findByIdAndDelete
app.delete("/user", async(req,res)=> {
    const id =req.body._id;
    try{
        const userId = await User.findByIdAndDelete({_id: id});
        if(!userId){
            res.status(404).send("userId not found");
        }
        res.send("User deleted successfully");
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
})
//Update data of the user
app.patch("/user/:userId", async (req,res) => {
    const userId= req.params?.userId.trim();
    const data = req.body;
    try{
        const ALLOWED_UPDATES =["about", "photourl", "skills","gender","age"];
        const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
           throw new Error("Update not allowed");
        }
        if(data?.skills?.length > 10){
            throw new Error("Skills can't be more than 10");
        }
        await User.findByIdAndUpdate({_id : userId}, data, {runValidators: true});
        if(!data){
            res.status(404).send("userId not found");
        }
        res.send("User data updated successfully");
    }
    catch(err){
        res.status(500).send("upadte status: "+ err.message);
    }
})

connectDB()
   .then(()=> {
    console.log("DB connected");
    app.listen(7777, ()=> {
    console.log("listening on port 7777");
});
   })
   .catch(err => {
    console.log("DB connection can't be done");
   })

