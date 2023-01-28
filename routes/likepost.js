const express = require("express");
const {PostModel} = require("../models/post");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/:id",authenticate, async (req,res)=>{
    try
    {
        let userid = req.user._id;
        let postid = req.params.id;
        const post = await PostModel.findOne({"_id":postid});
        if(!post) return res.status(404).send("Post not found!");
        if(post.likes.includes(userid)) return res.status(400).send("Post already liked!");
        post.likes.push(userid);
        await post.save();
        return res.status(200).send("Post liked successfully!");
    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
});

module.exports = router;