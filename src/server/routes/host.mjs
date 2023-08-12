import express from "express"
import Van from "../model/van.mjs"
import User from "../model/user.mjs"

const router = express.Router()

//get a list of all the records of host vans
router.get("/vans", async (req,res)=>{
  try{
    const vans= await Van.find()
    return res.status(200).json(vans)
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
})

//post request to server endpoint and match credentials
router.post('/vans', getUser, async (req,res)=>{
  console.log('here')
  try{
    const vans = await Van.find({hostId:req.body._id})
    console.log(vans)
    res.status(200).json(vans)
  }catch(err){
    res.status(500).json({message: err.message})
  }
 
})

//middlewear to get specific user
async function getUser(req,res,next){
  let user;
  try {
    user = await User.findById(req.body._id)
  }catch(err){
    return res.status(500).json({message:err.message})
  }
  res.user= user
  next()
}

export default router