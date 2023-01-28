const express = require("express");
const {PostModel} = require("../models/post");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.get("/",authenticate, async (req,res)=>{
    try
    {
        let userid = req.user._id;
        const posts = await PostModel.find({user:userid}).sort({time:-1});
        return res.status(200).send({
            posts: posts.map(post=>{
                return{
                    id:post._id,
                    title:post.title,
                    desc:post.desc,
                    time:post.time,
                    comments:post.comments,
                    likes:post.likes.length
                }
            })
        });
    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
});

module.exports = router;