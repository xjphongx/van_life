import express from "express";
import User from "../model/user.mjs"

const router = express.Router();

//get a list of all the records of user
router.get("/", async (req, res)=>{
  try {
    const users= await User.find()
    return res.json(users)
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

//get a specific user
router.get("/:id", getUser, (req,res)=>{
  console.log('getting specific user')
  res.status(200).json(res.user)
})

//middle ware function
async function getUser(req,res,next) {
  let user;
  try{
    console.log(req.params.id)
    user = await User.findById(req.params.id)
    if(user === null){
      return res.status(404).json({message:'cannnot find van'})
    }
  } catch (err){
    return res.status(500).json({message: err.message})
  }

  res.user = user
  next()//move onto the next section of the code
}
export default router;