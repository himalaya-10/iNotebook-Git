const mongo=require("mongoose")
const {Schema}=mongo
const notesSchema = new Schema({
    user:{
        type:mongo.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Notes=mongo.model("notes",notesSchema);
module.exports=Notes