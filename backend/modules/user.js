const mongo=require("mongoose")
const {Schema}=mongo

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true

    },
    password:{
        type:String,
        required:true
    }
})
const User=mongo.model("user",userSchema);
module.exports=User