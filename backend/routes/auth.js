const express=require("express");
//to import schema of user and the database where it stores all the requests
const User = require("../modules/user");
//to use router in this module and export it to other module.
const router = express.Router();
//for validating input in the schema.
const { body, validationResult } = require('express-validator');
//to use hash and salt method to secure password.
const bcrypt = require('bcrypt');
//to use token to verify the user{post the user password and if the token match access the user to his account}
const jwt=require("jsonwebtoken")

const JWT_secretkey="Himalaya";//Secret Key or Private Key: To sign the JWT, you need to provide a secret key or private key known only to the server or the entity responsible for generating the token. The key is used to create a cryptographic signature, which ensures the integrity of the token and allows for its verification later.
//createUser

const fetchUser=require("../middleware/login")



router.post("/createUser",[
    //validator messages and condition of schema
    body('name','Enter a valid name').isLength({min: 2}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a password more than 5 letters').isLength({min: 5}),
],async(req,res)=>{
    let userexist=false;
    const result = validationResult(req);//req is the input we post or get..
    //to check the input (condition)
    if (!result.isEmpty()) {
        return res.status(400).json({errors:result.array()});
    }
    try{

    let user=await User.findOne({email:req.body.email});// to make email of a person unique 
    
    if(user){
        userexist=true;
        return res.status(400).json({userexist,errors:"try to login with correct credentials"});
    }
    //applying salt and hash to password
    const salt=await bcrypt.genSalt(10);// asynchronous function it takes time to complete so use await to stop other synchrounous process and waith the promise to complete.
    const secpassword=await bcrypt.hash(req.body.password,salt)
    //create an index of user in database./and save it.
    user=User.create({
        name:req.body.name,
        email:req.body.email,
        password:secpassword
    })

    //applying token to password.
    const data={
        user:user.id//unique it is a parameter made int mongodb automatically to uniquely identify requests.
    }
    const authtoken=jwt.sign(data,JWT_secretkey)//singing the jwtkey with the data
    res.json(authtoken)
    } catch(error){
        console.log(error)
        res.status(400).send("Internal error occured");
    }

})

//authentication

router.post("/login",[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
],async(req,res)=>{
    let success=false;
    const result = validationResult(req);//req is the input we post or get..
    //to check the input (condition)
    if (!result.isEmpty()) {
        return res.status(400).json({errors:result.array()});
    }
    let{email,password}=req.body
    try{
        let user=await User.findOne({email:email})
        if(!user){
            success=false;
            return res.status(400).json({success,errors:"try to login with correct credentials"});
        }
        let inputpassword=await bcrypt.compare(password,user.password)
        if(!inputpassword){
            success=false;
            return res.status(400).json({success,errors:"try to login with correct credentials"});
        }
        const data={
            user:user.id//unique it is a parameter made int mongodb automatically to uniquely identify requests.
        }
        const authtoken=jwt.sign(data,JWT_secretkey)//singing the jwtkey with the data.
        success=true;
        res.json({success,authtoken})
    }
    catch(error){
        console.log(error)
        res.status(400).send("Internal error occured");
    }
})


//used the token that we get from valid login to see our information .....
//token=id<->info.


//getuser

router.post("/getuser",fetchUser,async(req,res)=>{//pass a middle ware to verify the user and fetch it id
    try{
        userId=req.user
        const user=await User.findById(userId).select("-password")
        res.send(user)
    }
    catch{
        console.log(error)
        res.status(400).send("Internal error occured");
    }
})


module.exports=router;