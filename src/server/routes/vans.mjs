import express from "express";
import Van from "../model/van.mjs";

const router = express.Router();

//get a list of all the records of vans
router.get("/", async (req, res)=>{
  try {
    const vans= await Van.find()
    return res.status(200).json(vans)
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

//get a specific van object
router.get("/:id", getVan, (req, res)=>{
  console.log('getting specific van')
  res.status(200).json(res.van)
})


//middle ware function
async function getVan(req,res,next) {
  let van;
  try{
    van = await Van.findById(req.params.id)
    if(van === null){
      return res.status(404).json({message:'cannnot find van'})
    }
  } catch (err){
    return res.status(500).json({message: err.message})
  }

  res.van = van
  next()//move onto the next section of the code
}

export default router;