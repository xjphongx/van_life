import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//get a list of all the records of user
router.get("/", async (req, res)=>{
  const collection = await db.collection("users")
  const results = await collection.find({}).toArray()
  console.log(results)
  res.send(results).status(200)
})

export default router;