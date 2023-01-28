const express = require("express");
const {PostModel} = require("../models/post");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/:id",authenticate, async (req,res)=>{
    try
    {
        let postid = req.params.id;
        let userid = req.user._id;
        let post = await PostModel.findOne({"_id":postid});
        if(!post) return res.status(404).send("Post not found!");
        if(!post.likes.includes(userid)) return res.status(400).send("Post not liked yet!");
        post.likes.splice(post.likes.indexOf(userid),1);
        await post.save();
        return res.status(200).send("Post unliked successfully!");
    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
})

module.exports = router;