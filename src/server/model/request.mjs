import mongoose from "mongoose"

const requestSchema = new mongoose.Schema({
  status: String,
  submissionDate: String,
  requestedUserId: String,
  requestedUserFirstName: String,
  requestedUserLastName: String,
  description: String,
  vanHostId: String,
  requestedVanName: String,
  requestedVanId: String,
  requestedDatesArray: Array,
  isArchived: Boolean
})

export default mongoose.model('Request', requestSchema)