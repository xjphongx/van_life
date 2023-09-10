import express from "express";
import User from "../model/user.mjs"

const router = express.Router();

//get a list of all the records of user
router.get("/", async (req, res)=>{
  console.log("getting all users")
  try {
    const users= await User.find()
    return res.json(users)
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

//get a specific user
router.get("/:id", async (req,res)=>{
  console.log('getting specific user') 
  let user;
  try{
    console.log(req.params.id)
    user = await User.findById(req.params.id)
    if(user === null){
      return res.status(404).json({message:'cannnot find User'})
    }
  } catch (err){
    return res.status(500).json({message: err.message})
  }
  return res.status(200).json(user)
})



//get the host user with POST because its safer
router.post("/", getHostUser, async (req,res)=>{
  console.log("getting specific host user")
  return res.status(200).json(res.user)
})

//middlewear
async function getHostUser(req,res,next){
  console.log("getting host user")

  let hostUser;
  try{
    console.log(req.body)
    hostUser = await User.findById(req.body.hostId)
    if(hostUser === null){
      return res.status(404).json({message:'cannnot find User'})
    }
  }catch(err){
    return res.status(500).json({message: err.message})
  }
  console.log(hostUser)
  res.user = hostUser
  next()
}

export default router;