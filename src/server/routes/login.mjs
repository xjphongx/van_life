import express from "express"
import User from "../model/user.mjs"

const router = express.Router()

//post request to server
router.post("/login", async (req,res)=>{
  console.log(req)
  const {email,password} = JSON.parse(req.body)

  try{

  } catch(err){
    res.status(500).json({message: err.message})
  }
} )

export default router