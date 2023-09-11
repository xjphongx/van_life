import express from "express"
import Van from "../model/van.mjs"
import User from "../model/user.mjs"
import Request from "../model/request.mjs"
import jwt from "jsonwebtoken"

const router = express.Router()


//host dashboard
router.get('/profile',async (req,res)=>{
  try{
    const {token} = req.cookies
    if(token){
      jwt.verify(token, process.env.JWT_SECRET,{}, (err, user)=>{
        if(err) throw err;
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
  console.log("host vans post request")
  const user = req.user
  try{
    const vans = await Van.find({hostId:user.id})
    res.status(200).json(vans)
  }catch(err){
    res.status(500).json({message: err.message})
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

//post request to server with a van to post to database
router.post('/vans/upload', getUser, async(req,res)=>{
  console.log("posting new van to database")

  try{
    const user = req.user
    const {name,description,type,licensePlate,price,imageUrl,avaliable} = req.body
    //Create a new van and upload to mongodb
    const van = new Van({
      name:name,
      price:price,
      description:description,
      type:type,
      hostId:user.id,
      licensePlate:licensePlate,
      visiblity:"Public",
      imageUrl:JSON.parse(imageUrl),
      avaliable:avaliable
    })
 
    const newHostVan = await van.save()
    return res.status(201).json(newHostVan)
  } catch(err){
    return res.status(400).json({message:err.message})
  }

})

router.post("/requestHost", getUser, async (req,res)=>{
  console.log("getting host's request")
  try{
    const user = req.user
    const host = await User.find({_id: user.id})
    res.status(200).json(host[0].requests)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})


//get host vans review
router.post("/review", getUser, async (req,res)=>{
  console.log("getting host van's reviews")
  //get the reviews in the database

  try{
    const user = req.user
    const vans = await Van.find({
      hostId:user.id,
      reviews: {$exists: true}
    })
    res.status(200).json(vans)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})





router.get('/request/:id', async (req,res)=>{
  //getting specific request
  console.log("getting specific request")
  try{
    const host = await User.find({"requests._id": req.params.id})
    host[0].requests.map((request)=>{
      if(request._id === req.params.id){
        return res.status(200).json(request)
      }
      //return res.status(400).json({message:"no such request exists"})
    })
    
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

router.put('/request', async(req,res)=>{
  console.log("updating request status")
  const {requestId, hostId, status} = req.body
  console.log(status)
  try{
    //update the host's request's status
    const host = await User.updateOne(
      {_id:hostId, "requests._id":requestId},
      {$set: {"requests.$.status": status}}
    )
    res.status(200).json({message:"updated"})
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

export default router