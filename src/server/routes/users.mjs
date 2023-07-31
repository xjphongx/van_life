import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//get a list of all the records of user
router.get("/", async (req, res)=>{
  res.send("user list")
  const userCollection = await db.collection("users")
  const results = await userCollection.find({}).toArray()
  console.log(results)
  res.send(results).status(200)
})

export default router;