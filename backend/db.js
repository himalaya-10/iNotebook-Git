const mongoose=require('mongoose')
const mongooseUrl="mongodb://localhost:27017"

const connectToMongoose=()=>{
    mongoose.connect(mongooseUrl)
}

module.exports=connectToMongoose;