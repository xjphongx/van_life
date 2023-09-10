import express from "express"
import Van from "../model/van.mjs"
import User from "../model/user.mjs"
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

//post a new request to host's request array
router.post('/request', getUser, async(req,res)=>{
  console.log("updating host user's request array with new request")
  try{
    let user = req.user
    const {requestObjectId, description, requestedDateArray, requestedVanId, vanHostId} = req.body
    //create a request object
    const request = {
      _id:requestObjectId,
      requestedUserId:user.id,
      requestedUserFirstName:user.firstName,
      requestedUserLastName:user.lastName,
      description: description,
      vanHostId:vanHostId,
      requestedVanId:requestedVanId,
      requestedDatesArray: JSON.parse(requestedDateArray)
    }

    const results = await User.updateOne(
      { _id:vanHostId },
      { $push: { requests: request} }
    )
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

export default router