import express from "express"
import Van from "../model/van.mjs"
import jwt from "jsonwebtoken"

const router = express.Router()


//host dashboard
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

//middlewear to get specific user and its _id assigned by mongodb
//also use jwt to verify the token
async function getUser(req,res,next){
  const token = req.cookies.token;
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