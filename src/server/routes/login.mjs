import express from "express"
import User from "../model/user.mjs"
import { comparePassword } from "../auth.mjs"

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


//login in user from localhost/login
router.post("/", async (req, res)=>{
  console.log("fetch POST request to users")
  try{
    const {email, password} = req.body
    console.log(email,password)
    //check if the user already exist
    const foundUser = await User.findOne({email:email})
    if(!foundUser){//if there are no users, return an error
      return res.status(400).json({
        error: 'No user found.'
      })
    }

    //check the password if it matches
    const match = await comparePassword(password, foundUser.password)
    if(match){
      //assign a JWT
      res.json('passwords match')
    } else {
      res.json({
        error: 'Passwords do not match'
      })
    }

    return res

  }catch(err){
    res.status(400).json({message:err.message})
  }
  
  
} )

export default router