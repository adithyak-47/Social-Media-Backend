const express = require("express");
const {UserModel} = require("../models/user");
const router = express.Router();

router.post("/:id", async (req,res)=>{
    let unfollowID = req.params.id;
    let userID = req.body._id;
    try
    {
    
        UserModel.findById(userID, (err,user)=>{
            if(err) return res.status(500).send(err);
            if(!user.following.includes(unfollowID)) return res.status(404).send("User not followed.");
            user.following.pull(unfollowID);
            user.save((err,unfollowedUser)=>{
                if(err) return res.status(401).send(err);
                UserModel.findByIdAndUpdate(unfollowID,{$pull:{followers:userID}},(err,savedUser)=>{
                    if(err) return res.status(500).send(err);
                    res.status(200).send("Unfollowed successfully!");
                });
            });
        });
    }
    catch(err)
    {
        res.status(500).json({message : err.message });
    }
});

module.exports = router;