const express = require("express");
const {PostModel} = require("../models/post");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/", authenticate, async (req,res)=>{
   try
   {
    let title = req.body.title;
    let desc = req.body.desc;
    const post = new PostModel(
        {
            title,
            desc,
            user:req.user._id,
            time: new Date().toUTCString()
        }
    );
    await post.save();
    res.status(200).json(
        {
            id:post._id,
            title:post.title,
            desc:post.desc,
            time:post.time
        }
    );

   }
   catch(err)
   {
        res.status(500).json({message:err.message});
   }
    
});


router.delete("/:id", authenticate , async(req,res)=>{
    try
    {
        let id = req.params.id;
        let user = req.user._id;
        const post = await PostModel.findOne({"_id":id,"user":user});
        if(!post) return res.status(404).send("Post does not exist!");
        await post.remove();
        return res.status(200).send("Post deleted successfully!");
    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
} );


router.get("/:id", async (req,res)=>{
    try
    {
        let postid = req.params.id;
        const post = await PostModel.findOne({"_id":postid});
        let likesCount = post.likes.length;
        let commentsCount = post.comments.length;
        return res.status(200).json({likes:likesCount,comments:commentsCount});

    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
})

module.exports = router;