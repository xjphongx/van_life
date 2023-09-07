import mongoose from "mongoose";


const vanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description:String,
  imageUrl: Array,
  type: String,
  hostId: String,
  visiblity: String,
  avaliable: Boolean
})

export default mongoose.model('Van', vanSchema)