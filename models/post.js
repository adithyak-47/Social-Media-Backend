const Mongoose = require("mongoose");
const {UserModel} = require("./user");

const PostModel = Mongoose.model(
    "posts",
    new Mongoose.Schema(
        {
            title : {type:String, required:true},
            desc : {type:String , required:true},
            likes : [{type:Mongoose.Schema.Types.ObjectId,ref:"users"}],
            comments : [{
                user : { type: Mongoose.Schema.Types.ObjectId , ref:"users"},
                text : { type : String },
            }],
            time : {type:Date,default:Date.now},
            user : {type:Mongoose.Schema.Types.ObjectId, ref:"users", required:true}
        }
    )
);

module.exports = {PostModel};