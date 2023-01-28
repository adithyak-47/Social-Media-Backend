const express = require("express");
const {PostModel} = require("../models/post");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/:id",authenticate, async (req,res)=>{
    try
    {
        let postid = req.params.id;
        let userid = req.user._id;
        const post = await PostModel.findOne({"_id":postid});
        if(!post) return res.status(404).send("Post does not exist!");
        let comment = {user:userid , text:req.body.text};
        post.comments.push(comment);
        await post.save();
        let savedComm = post.comments.find(
            (c) => {c.user.toString() === userid.toString() && c.text === req.body.text} 
        );
        return res.status(200).send({commentid:savedComm._id});
    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
})

module.exports = router;