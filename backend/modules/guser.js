const mongo=require('mongoose')
const guserschema=mongo.Schema;

const guser=new guserschema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,

    }
})

const googleUser=mongo.model("googleUser",guser)
module.exports=googleUser;