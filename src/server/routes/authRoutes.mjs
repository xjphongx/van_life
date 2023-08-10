import express from "express";
import cors from "cors"
const router = express.Router()

//middleware
router.use(
  cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

router.get('/',(req,res)=>{
  res.json('test is working')
})

export default router