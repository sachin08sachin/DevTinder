const express = require('express');
const app = express();

//app.use("\route", rH1, [rH2, rH3], rH4); -> works fine
app.use("/user",[(req,res, next)=> {
    //  res.send("hello world from user 1");
    console.log("request handler user 1");
   next();
},(req,res,next)=> {
    console.log("request handler user 2");
    // res.send("hellow");
    next();
}],(req,res,next)=> {
    console.log("request handler user 3");
   // res.send("hellow 3");
   next();
},(req,res,next)=> {
    console.log("request handler user 4");
    res.send("hellow 4");
    // next();
});
app.listen(7777, ()=> {
    console.log("listening on port 7777");
});