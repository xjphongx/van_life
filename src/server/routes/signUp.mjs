/* This is my backend server endpoint */
import express from 'express'
import User from "../model/user.mjs"
import {hashPassword, comparePassword} from '../auth.mjs'

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
    const {type,firstName,lastName, email, confirmEmail, password, confirmPassword,dateOfBirth,phone} = req.body
  
    /* Form validation in the server */
    //check if email and confirmEmail matches
    if(email!==confirmEmail){
      console.log("Emails do not match")
      return res.status(400).json({
        error: 'Emails do not match.'
      })
    }
    
    //chech if password is valid and over 6 characters
    if(!password || password.length < 6){
      console.log("Password is required and should be at least 6 characters long")
      return res.status(400).json({
        error: 'Password is required and must be 6 characters long.'
      })
    }


    //check if password and confirmPassword matches
    if(password!==confirmPassword){
      console.log("Passwords do not match")
      return res.status(400).json({
        error: 'Passwords do not match.'
      })
    }

    //check email if its already used
    const userExist = await User.findOne({email})
    if(userExist){
      console.log("Email is taken")
      return res.status(400).json({
        error: 'Email is taken.',
        emailExist:true
      })
    }
   
    //check if the date is valid and over 18
    const dateArray = dateOfBirth.split(/-/) //[year, month, day]
    const userYear = Number(dateArray[0])
    const userMonth = Number(dateArray[1])
    const userDay = Number(dateArray[2])
    const today = new Date()
    const minimumYear = today.getFullYear()-18
    const minimumMonth = today.getMonth()+1
    const minimumDay = today.getDate()
    if(userYear>minimumYear){ //checks if user has a valid birth year, must be 18 years away from current year
      console.log("Must be 18 years and older")
      return res.status(400).json({
        error: 'Must be 18 years and older.'
      })
    } else if(userYear === minimumYear && userMonth >minimumMonth){ //checks if month is a valid month
      console.log("Must be 18 years and older")
      return res.status(400).json({
        error: 'Must be 18 years and older.'
      })
    } else if (userYear === minimumYear && userMonth ===minimumMonth && userDay > minimumDay){//checks if day is valid
      console.log("Must be 18 years and older")
      return res.status(400).json({
        error: 'Must be 18 years and older.'
      })
    }
    
    //check if the phone number exist 
    /* const phoneExist = await User.findOne({phone})
    if(phoneExist){
      console.log("Phone number already in use", phoneExist)
      return res.status(400).json({
        error: 'Phone number already in use',
      })
    } */

    //create a hashed password to save to db
    const hashedPassword = await hashPassword(password)
    //save the User object with a hashed password
    console.log("saving user")
    const user = new User({ //create a new User object
      type: type,
      firstName: firstName,
      lastName: lastName,
      email:email,
      password: hashedPassword,
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