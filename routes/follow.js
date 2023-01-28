const express = require("express");
const {UserModel} = require("../models/user");
const router = express.Router();

router.post("/:id", async (req,res)=>{
    let followingId = req.params.id;
    let followerId = req.body._id;
    try
    {
        let followingUser = await UserModel.findByIdAndUpdate(
            followingId,
            {$addToSet: { followers : followerId } },
            { new: true }
        );

        let followerUser = await UserModel.findByIdAndUpdate(
            followerId,
            { $addToSet : { following : followingId } },
            { new : true }
        );
        res.json({followingUser , followerUser});
    }
    catch(err)
    {
        res.status(500).json({message : err.message});
    }
});

module.exports = router;