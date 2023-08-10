import express from 'express'
import User from "../model/user.mjs"

const router = express.Router()

//get a list of all records of user
router.get("/", async (req, res)=>{
  console.log("getting all users")
  try {
    const users= await User.find()
    return res.json(users)
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

//post a new user 
router.post("/", async (req, res)=>{
  console.log("posting to database")
  try{
    //save the User object
    const user = new User({ //create a new User object
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    dateOfBirth: req.body.dateOfBirth,
    phone: req.body.phone
  })
    const newUser = await user.save()
    res.status(201).json(newUser) //201 created a new object
    
  }catch(err){
    res.status(400).json({message:err.message})
  }
})

export default router