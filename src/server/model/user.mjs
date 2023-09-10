import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  type: String,
  email: String,
  password: String,
  dateOfBirth: String,
  phone: Number,
  firstName: String,
  lastName: String,
  requests: Array
})

export default mongoose.model('User', userSchema)