import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

//get a list of all the records of vans
router.get("/", async (req, res)=>{
  res.send("van list")
  const vanCollection = await db.collection("vans")
  const results = await vanCollection.find({}).toArray()
  console.log(results)
  res.send(results).status(200)
})

export default router;