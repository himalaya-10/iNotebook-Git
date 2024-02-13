const express=require("express");
const jwt=require("jsonwebtoken")
const fetchUser=require("../middleware/login")
// const User=require("../modules/user")
const router = express.Router();
const Notes=require("../modules/notes")
const { body, validationResult } = require('express-validator');

//to fetch notes from database of valid foreign key user
router.get("/getNotes",fetchUser,async(req,res)=>{
    try{
    const notes=await Notes.find({user:req.user})
    res.json(notes)
    }
    catch(error){
        console.log(error)
        res.status(400).send("Internal error occured");
    }
    
})



//to create notes for user
router.post("/createNotes",fetchUser,[
    body('title','Enter Title').isLength({min: 1}),
    body('description','Enter Description').isLength({min: 1}),
    body('tag','Enter tag').isLength({min: 0})
],async(req,res)=>{

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors:result.array()});
    }
    try{
    let {title,description,tag}=req.body;
    userid=req.user;
    const note=new Notes({
        title,description,tag,user:userid
    })
    const savednote=await note.save()
    res.json(savednote)
}
catch(error){
    console.log(error)
    res.status(400).send("Internal error occured");
}
})

//to update notes for user
router.put("/updateNotes/:id",fetchUser,[//id we need to to give javascript while making the website.
    body('title','Enter Title').isLength({min: 1}),
    body('description','Enter Description ').isLength({min: 1}),
    body('tag','Enter tag').isLength({min: 0}),
],async(req,res)=>{

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors:result.array()});
    }
    try{
    let {title,description,tag}=req.body;
    userid=req.user;
    //creat newnote object
    const newnote={}
    //and then add changes to this note.
    if(title){newnote.title=title}
    if(description){newnote.description=description}
    if(tag){newnote.tag=tag}

    //find the note to be updated.
    let unote= await Notes.findById(req.params.id)//it will take the id present in route..
    if(!unote){return res.status(404).send("Not Found!")}
    if(userid!==unote.user.toString()){
        return res.status(401).send("Not Allowed!")
    }
    unote= await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json(unote)
}
catch(error){
    console.log(error)
    res.status(400).send("Internal error occured");
}
})


//to delete notes for user
router.delete("/deleteNotes/:id",fetchUser,async(req,res)=>{
    try{
    userid=req.user;
    let dnote= await Notes.findById(req.params.id)//it will take the id present in route..
    if(!dnote){return res.status(404).send("Not Found!")}
    if(userid!==dnote.user.toString()){
        return res.status(401).send("Not Allowed!")
    }
    dnote= await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted...",note: dnote})
}
catch(error){
    console.log(error)
    res.status(400).send("Internal error occured");
}
})
module.exports=router;