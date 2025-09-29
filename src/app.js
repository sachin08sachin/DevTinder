const express = require('express');
const app = express();

app.get("/getUserData", (req,res)=> {
    try{
        //Logic to connect DB and getUserData
        throw new Error("DB connection failed");
        res.status(200).send("User data");
    }
    catch(err) {
        res.status(500).send("Error found");
    }
})

//Always keep last of the application ("/")
app.use((err, req,res, next) => {
    if(err){
        res.status(500).send("Some error occurred");
    }
});
app.listen(7777, ()=> {
    console.log("listening on port 7777");
});