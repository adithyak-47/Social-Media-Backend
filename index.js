const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Express = require("express");
const Cors = require("cors");
const port = process.env.port || 3000;
const dotenv = require("dotenv");

const auth = require("./routes/auth");
const follow = require("./routes/follow");
const unfollow = require("./routes/unfollow");
const findUser = require("./routes/finduser");
const posts = require("./routes/posts");
const likeposts = require("./routes/likepost");
const unlikeposts = require("./routes/unlikepost");
const comment = require("./routes/comment");
const getposts = require("./routes/getposts");

const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(Cors());
dotenv.config();
const url = process.env.MONGODB_URL;

Mongoose.connect(url);

app.get("/", (req,res)=>{
    res.send("You are in the root page!.");
});

app.use("/api/authenticate",auth);
app.use("/api/follow",follow);
app.use("/api/unfollow",unfollow);
app.use("/api/user",findUser);
app.use("/api/posts",posts);
app.use("/api/like",likeposts);
app.use("/api/unlike",unlikeposts);
app.use("/api/comment",comment);
app.use("/api/all_posts",getposts);

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;