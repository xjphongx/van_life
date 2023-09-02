import express from "express"
import User from "../model/user.mjs"
import jwt from "jsonwebtoken"

const router = express.Router()

router.get('/', async (req,res)=>{
  try{
    res.clearCookie("token",{
      httpOnly:true
    }).status(200).json({message:"Cleared Cookie"})
    
  }catch(err){
    res.status(500).json(err)
  }
  

  
})

export default router