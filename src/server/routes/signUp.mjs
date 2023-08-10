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
//recieves request from client side to post to backend database
router.post("/", async (req, res)=>{
  console.log("Sending POST request to sign up a new user")
    
  try{
    const {firstName,lastName, email, confirmEmail, password, confirmPassword,dateOfBirth,phone} = req.body
    //check if password is strong
    /* if(password.length<6){
      return res.json({
        error: 'password is too short'
      })
    } */
    
    //check email if its already used
    const exist = await User.findOne({email})
    if(exist){
      console.log("Email is taken")
      return res.status(400).json({
        message: 'Email is taken',
        emailExist:true
      })
    }

    //check if email and confirmEmail matches
    if(email!==confirmEmail){
      console.log("Emails do not match")
      return res.status(400).json({
        message: 'Emails do not match'
      })
    }

    //check if password and confirmPassword matches
    if(password!==confirmPassword){
      console.log("Passwords do not match")
      return res.status(400).json({
        message: 'passwords do not match'
      })
    }
    //save the User object
    console.log("saving user")
    const user = new User({ //create a new User object
      firstName: firstName,
      lastName: lastName,
      email:email,
      password: password,
      dateOfBirth: dateOfBirth,
      phone: phone
    })
    const newUser = await user.save()
    return res.status(201).json(newUser) //201 created a new object
  }catch(err){
    return res.status(400).json({message:err.message})
  }
})

export default router