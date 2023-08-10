import express from "express"
import User from "../model/user.mjs"

const router = express.Router()

//get all users from login route
router.get("/", async (req,res)=>{
  console.log("getting all users from login route")
  try{
    const users= await User.find()
    return res.json(users)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})


//login in user
router.post("/", async (req,res)=>{
  console.log("fetch POST request to users")
    const email = JSON.parse(req.body.email)
    //const password = JSON.parse(req.body.password)
    //console.log(email)
  try{
    
    const foundUser = await User.findOne({email:'b@b.com'})
    console.log(foundUser)
    if(!foundUser){
      return new Response(404,{}, {message:"No user with those credentials found"})
    }
    //set password to undefined for now
    //foundUser.password = undefined
    return res

  }catch(err){
    
    res.status(400).json({message:err.message})
  }
  
  
} )

export default router