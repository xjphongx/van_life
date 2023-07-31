import mongoose from "mongoose";


const vanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description:String,
  imageUrl: String,
  type: String,
  hostId: Number,
  visiblity: String,
})

export default mongoose.model('van', vanSchema)