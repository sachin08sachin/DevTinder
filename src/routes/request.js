const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');

requestRouter.post("/sendconnectionrequest", userAuth, async (req,res)=> {
    const user = req.user;
    res.send("Connection request sent from "+ user.firstName);
})

module.exports = requestRouter;