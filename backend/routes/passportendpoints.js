const express=require("express");
const router = express.Router();
const mongo=require("mongoose")
const googleUser = require("../modules/guser");

const passport=require('passport');

const jwt=require("jsonwebtoken")

const JWT_secretkey="Himalaya";

const fetchUser=require("../middleware/login")

router.post("/login/success",async(req,res)=>{
    if(req.user){
        
        let user=req.user;

        // console.log(user)
        let UEmail= await googleUser.findOne({email:user.emails[0].value})
        if(UEmail){
            // console.log(UEmail)
            const data={
                user:UEmail._id.toString()
            }
            const authtoken=jwt.sign(data,JWT_secretkey)//singing the jwtkey with the data.
            return res.status(200).json({error:false,msg:"successfully logged in",user:req.user
            ,authtoken: authtoken})
        }
        else{

            // console.log(user)
            user=await googleUser.create({
                name:user.displayName,
                email:user.emails[0].value
            })
            const data={
                user:user._id.toString(),//adding here to string to make hex value
            }
            const authtoken=jwt.sign(data,JWT_secretkey)//singing the jwtkey with the data.
            success=true;
            return res.status(200).json({error:false,msg:"successfully logged in",user:req.user
            ,authtoken: authtoken})
        }

     
       
    

        
    }
    else{

        return res.status(403).json({error:true,msg:"Not authorized"})
    }
}
)


router.get("/login/failed",(req,res)=>{
    res.status(404).json({error:true,msg:"Log in failed."})
}
)
router.get("/google/callback",
    passport.authenticate("google",{
        successRedirect:"http://localhost:3000/enter",
        failureRedirect: 'http://localhost:8000/auth/login/failed'
    })
)
router.get("/google",passport.authenticate("google",["profile","email"]))


router.post("/getuser",fetchUser,async(req,res)=>{//pass a middle ware to verify the user and fetch it id
    try{
        userId=req.user
        
        const user=await googleUser.findById(userId)
        // console.log(user)
        
        res.send(user)
    }
    catch(error){
        console.log(error)
        res.status(400).send("Internal error occured");
    }
})

    module.exports=router;