const express = require('express');
const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth.js");

app.use("/admin", adminAuth);
app.get("/admin/getAllData", (req,res, next) => {
    console.log("admin getAllData route handler called");
    res.send("admin getAllData route handler called");
})
app.get("/admin/deleteAllData", (req, res, next) => {
    console.log("admin deleteAllData route handler called");
    res.send("admin deleteAllData route handler called");
})
//app.use("/user", userAuth);
//app.use("\route", rH1, [rH2, rH3], rH4); -> works fine
app.post("/user/login", (req,res)=> {
    res.send("user login route handler called");
})
app.get("/user/getuser",userAuth,(req,res,next)=> {
    console.log("print user 1!");
    res.send("get user data");
    
});
app.get("/user/deleteuser",userAuth, (req,res,next)=> {
    console.log("print user 2!");
  res.send("delete user data");
})
app.listen(7777, ()=> {
    console.log("listening on port 7777");
});