import express from "express"
import User from "../model/user.mjs"
import jwt from "jsonwebtoken"

const router = express.Router()

router.get('/profile', (req,res)=>{
  try{
    const {token} = req.cookies
    if(token){
      jwt.verify(token, process.env.JWT_SECRET,{}, (err, user)=>{
        if(err) throw err;
        //console.log(user)
        return res.status(200).json(user)
      })
    }else{
      return res.status(500).json(null)
    }
  } catch (err){
    res.status(500).json({
      message:err.message
    })
  }
})
export default router;