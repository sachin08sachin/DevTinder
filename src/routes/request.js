const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const connectionRequests = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=> {
   try{
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus =["interested", "ignored"];
      if(!allowedStatus.includes(status)){
        return res.json({
            message: "Invalid status value",
        })
      }

      const toUser = await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({
            message: "Recipient user does not exist",
        })
      }

      const existingConnectionRequest = await connectionRequests.findOne({
         $or: [
            {fromUserId, toUserId},
            {fromUserId: toUserId, toUserId: fromUserId}
         ]
      });
      if(existingConnectionRequest){
        return res.json({
            message: "Connection request already exists",
        })
      };

      const connectionRequest = new connectionRequests({
        fromUserId,
        toUserId,
        status
      });
      const data = await connectionRequest.save();
      res.status(200).json({
        message:  req.user.firstName +" is "+ status +" in "+ toUser.firstName,
        data,
      })
   }
   catch(err){
    res.status(400).send("ERROR :"+ err.message);
   }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.json({ message: "Invalid status value" });
        }
        const connectionRequest = await connectionRequests.findOne({
            _id : requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        })
        if(!connectionRequest){
            return res.status(404).json({
                message: "connection request not found",
            })
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.status(200).json({
            message: `Connection request ${status} successfully`,
            data,
        })
        
    }catch(err) {
        res.status(400).send("ERROR : "+ err.message);
    }
})

module.exports = requestRouter;