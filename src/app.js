const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json());

app.post("/signup", async (req,res)=> {
    // console.log(req.body);
    const user = new User(req.body);
    // const user = new User({
    //     firstName: "Virat",
    //     lastName: "Kohli",
    //     emailId: "virat@gmail.com",
    //     password: "virat123",
    // });
    try {
    await user.save();
    res.send("User signed up");
    }
    catch( err)  {
        console.log("Error in saving user");
        res.status(500).send("Internal server error");
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

