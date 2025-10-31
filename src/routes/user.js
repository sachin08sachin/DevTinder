const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const User = require('../models/user');
const connectionRequests = require('../models/connectionRequest');

const USER_SAFE_DATA = "firstName lastName photoUrl gender skills";

//get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received",userAuth,  async (req,res) => {
    try{
     const loggedInUser = req.user;
        // const requests = await User.findById(loggedInUser._id).populate('connectionRequests', { });
      const connectionRequest = await connectionRequests.find(
        {
            toUserId: loggedInUser._id,
             status: "interested",
        }).populate('fromUserId',USER_SAFE_DATA);
        // .populate('fromUserId',['firstName','lastName']); -> other way to populate
        res.status(200).json({
            message: "Connection requests fetched successfully",
            data: connectionRequest,
        })
    }catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }
})

userRouter.get("/user/connections", userAuth, async (req,res) => {
    try{
      const loggedInUser = req.user;
      const connectionRequest = await connectionRequests.find({
        $or: [
            {fromUserId: loggedInUser._id, status: "accepted"},
            {toUserId: loggedInUser._id, status: "accepted"}
        ],
      }).populate('fromUserId', USER_SAFE_DATA).populate('toUserId', USER_SAFE_DATA);

      const data = connectionRequest.map( (row) => {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
      });

      res.status(200).json({
       data,
      })

    }catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }
})

userRouter.get("/feed", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;
        const page =parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip =(page -1)*limit;
        const connectionRequest = await connectionRequests.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select('fromUserId toUserId');
        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })
       
        const users = await User.find(
        {
                $and: [
               { _id: { $nin: Array.from(hideUserFromFeed)}},
               { _id: { $ne: loggedInUser._id}}
            ]
        }
       ).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.send(users);

    }catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }
})

module.exports = userRouter;