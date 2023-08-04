import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  dateOfBirth: Number,
  phone: Number,
  firstName: String,
  lastName: String
})

export default mongoose.model('User', userSchema)