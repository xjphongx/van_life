import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";

try {
  mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'vanlife',
  })
} catch(e) {
  console.error(e);
}

let db = mongoose.connection
//console.log(db)

export default db;