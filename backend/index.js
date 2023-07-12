const connectToMongoose=require('./db')
const cors = require('cors')
const express = require('express')
connectToMongoose();



const app=express();
app.use(cors())
const port=8000
app.use(express.json())

app.use("/api",require("./routes/auth.js"))
app.use("/api",require("./routes/notes.js"))

// app.use("/api/notes",require("./routes/notes.js"))


app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})