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

