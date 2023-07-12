const jwt=require("jsonwebtoken")
const JWT_secretkey="Himalaya";

//to verify the token
const fetchUser=(req,res,next)=>{
    //make header of auth-token and pass the value to it
    const token=req.header('auth-token')
    if(!token){
        res.status(401),res.send({error:"please authenticate using valid token"})

    }
    try{
        // if it matches then put it data in req.user and export it
        const data = jwt.verify(token,JWT_secretkey);
        req.user=data.user;
        next();
    }
    catch(error){
        res.status(401),res.send({error:"please authenticate using valid token"})
    }

}
module.exports=fetchUser;