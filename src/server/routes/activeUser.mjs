import express from "express"
//import User from "../model/user.mjs"
import Van from "../model/van.mjs";
import User from "../model/user.mjs"
import jwt from "jsonwebtoken"

const router = express.Router()

//get the user profile
router.get('/profile',async (req,res)=>{
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

//get all vans
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

//get a specific van given the param id
router.get("/vans/:id", async (req,res)=>{
  console.log("getting specific host van")
  try{
    const van = await Van.findById(req.params.id)
    res.status(200).json(van)
  }catch(err){
    res.status(500).json({message: err.message})
  }
  }
)

router.post('/request', getUser, async(req,res)=>{
  console.log("updating user's request array with new request")
  try{
    let user = req.user
    console.log(user)
    const {requestObjectId, requestSubmissionDate,requestedVanName, description, requestedDateArray, requestedVanId, vanHostId} = req.body
    //create a request object
    const request = {
      _id:requestObjectId,
      status:"pending",
      submissionDate:requestSubmissionDate,
      requestedUserId:user.id,
      requestedUserFirstName:user.firstName,
      requestedUserLastName:user.lastName,
      description: description,
      vanHostId:vanHostId,
      requestedVanName:requestedVanName,
      requestedVanId:requestedVanId,
      requestedDatesArray: JSON.parse(requestedDateArray)
    }
    console.log(request)
    const results = await User.updateOne(
      { _id:user.id },
      { $push: { requests: request} }
    )
    console.log(results)
    return res.status(201).json(results)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

//middlewear to get specific user and its _id assigned by mongodb
//also use jwt to verify the token
async function getUser(req,res,next){
  const token = req.cookies.token;
  //console.log("token", token)
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next()
  }catch(err){
    res.clearCookie('token')
    return res.status(500).json({message:err.message}).redirect("/login")
  }
}

export default router;