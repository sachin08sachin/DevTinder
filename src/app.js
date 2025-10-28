const express = require('express');
const cookieParser = require("cookie-parser");
const connectDB = require('./config/database');
const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
//GET user by emailId 
// app.get("/user", async (req,res) => {
//     const userEmail = req.body.emailId;
//     try{
//         const users = await User.find({emailId: userEmail});
//         if(users.length === 0){
//             res.status(404).send("User not found");
//         }
//         res.send(users);
//     }
//     catch(err) {
//         res.status(400).send("Error in fetching user");
//     }
// })
// //FEED API - GET / FEED get all users from dtatabase
// app.get("/feed", async (req, res) => {
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }
//     catch(err){
//         res.status(500).send("Internal server error");
//     }
// })
// //if  two users have same mailId -> gives an object not an array
// app.get("/user", async(req,res) => {
//     const userEmail = req.body.emailId;
//     try{
//         const users = await User.findOne({emailId: userEmail});
//         if(!users){
//             res.status(404).send("user not found");
//         }
//         res.send(users);
//     }
//     catch(err){
//         res.status(500).send("Internal server error");
//     }
// })
// //findbyID
// app.post("/user", async(req,res) => {
//      const id = req.body._id;
//     try{
//         const user = await User.findById(id);
//         if(!user){
//             res.status(404).send("userId not found");
//         }
//         res.send(user);
//     }
//     catch(err){
//         res.status(500).send("Internal server error");
//     }
// })
// //findByIdAndDelete
// app.delete("/user", async(req,res)=> {
//     const id =req.body._id;
//     try{
//         const userId = await User.findByIdAndDelete({_id: id});
//         if(!userId){
//             res.status(404).send("userId not found");
//         }
//         res.send("User deleted successfully");
//     }
//     catch(err){
//         res.status(500).send("Internal server error");
//     }
// })
// //Update data of the user
// app.patch("/user/:userId", async (req,res) => {
//     const userId= req.params?.userId.trim();
//     const data = req.body;
//     try{
//         const ALLOWED_UPDATES =["about", "photourl", "skills","gender","age"];
//         const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
//         if(!isUpdateAllowed){
//            throw new Error("Update not allowed");
//         }
//         if(data?.skills?.length > 10){
//             throw new Error("Skills can't be more than 10");
//         }
//         await User.findByIdAndUpdate({_id : userId}, data, {runValidators: true});
//         if(!data){
//             res.status(404).send("userId not found");
//         }
//         res.send("User data updated successfully");
//     }
//     catch(err){
//         res.status(500).send("upadte status: "+ err.message);
//     }
// })
//profile API


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

