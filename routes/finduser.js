const express = require("express");
const {UserModel} = require("../models/user");
const authenticate = require("../middleware/authenticate");
const router = express.Router();


router.get("/", authenticate, async (req,res)=>{
    try
    {
        const id = req.user._id;
        let person = await UserModel.findOne({"_id":id});
        res.status(200).json({
            name:person.name,
            followers:person.followers.length,
            following:person.following.length
        });
    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
});

module.exports = router;