import mongoose from "mongoose";


const vanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description:String,
  imageUrl: String,
  type: String,
  hostId: String,
  visiblity: String,
})

export default mongoose.model('Van', vanSchema)