const express = require("express");
const {UserModel} = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req,res)=>{
    let request = req.body;
    let data = await UserModel.findOne({"email":request.email});
    if(!data) res.status(401).send("Cannot find!");
    let email = data.email;
    let password = data.password;
    let id = data._id;
    if(email !== request.email)
    {
        res.status(401).send("Invalid email!");
    }
    else if(password !== request.password)
    {
        res.status(401).send("Invalid password!");
    }
    else
    {
        let payload = {email:email,password:password,_id:id};
        let token = jwt.sign(payload,'secretKey');
        res.status(200).send({token});
    }
})

module.exports = router;