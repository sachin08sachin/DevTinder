const express = require('express');
const app = express();
app.use("/test",(req,res)=> {
    res.send("hello world");
});
app.listen(3000, ()=> {
    console.log("listening on port 3000");
});