const Mongoose = require("mongoose");

const UserModel = Mongoose.model(
    "users",
    new Mongoose.Schema(
        {
            email: {type:String, required:true},
            password : {type:String, required:true},
            name : {type:String},
            followers : [{type: Mongoose.Schema.Types.ObjectId, ref:"users"}],
            following : [{type: Mongoose.Schema.Types.ObjectId, ref:"users"}],
            // posts : [{type:Mongoose.Schema.Types.ObjectId , ref:"posts"}]
        }
    )
);

module.exports = {UserModel};