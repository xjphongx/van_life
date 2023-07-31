import express from "express";
import db from "../db/conn.mjs";
import van from '../model/van.mjs'

const router = express.Router();

//get a list of all the records of vans
router.get("/", async (req, res)=>{
  
  //res.send("van list")
  try {
    const vans = await van.find()
    return res.json(vans)
  } catch(err){
    res.status(500).json({message: err.message})
  }
  /* const vanCollection = await db.collection("vans")
  const results = await vanCollection.find({}).toArray()
  res.send(results).status(200) */
})

export default router;