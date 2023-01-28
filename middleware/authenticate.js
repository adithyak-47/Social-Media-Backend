const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message:"Unauthorized"});
    try
    {
        const decoded = jwt.verify(token,'secretKey');
        req.user = decoded;
        next();
    }
    catch(err)
    {
        return res.status(401).json({message:"Error"});
    }
};

module.exports = authenticate;