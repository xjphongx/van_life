import express from "express"
import Van from "../model/van.mjs"
import User from "../model/user.mjs"
import Request from "../model/request.mjs"
import jwt from "jsonwebtoken"

const router = express.Router()

router.get('/', async (req,res)=>{
  try{
    const requests = await Request.find()
    return res.json(requests)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})
router.get('/:id', async (req,res)=>{
  console.log(req.params.id)
  try{
    const request = await Request.find({_id:req.params.id})
    return res.status(200).json(request[0])
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

router.get('/host/:hostId', async (req, res)=>{
  console.log("getting request with specific hostId")
  console.log(req.params.hostId)
  try{
    //get the requests with this hostId
    const requests = await Request.find({vanHostId:req.params.hostId})
    return res.status(200).json(requests)
  }catch(err){
    return res.status(500).json({message: err.message})
  }
})

//any user can post a new request to host's request array
router.post('/', getUser, async(req,res)=>{
  console.log("updating host user's request array with new request")
  try{
    let user = req.user
    const {requestObjectId, requestSubmissionDate,requestedVanName, description, requestedDateArray, requestedVanId, vanHostId} = req.body
    //create a request object
    const request = new Request({
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
    }) 
    console.log(request)
    const newRequest = await request.save()
    return res.status(201).json(newRequest)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})
/* (
      { _id:vanHostId },
      { $push: { requests: request} }
    ) */

router.post('/host/:id', async(req,res)=>{
  console.log("getting host requests")
  console.log(req.params.id)
  try{
    //find requests with this hostID
  }catch(err){
    return res.status(500).json({message: err.message})
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

export default router