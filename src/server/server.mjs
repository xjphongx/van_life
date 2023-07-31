import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"
import db from "./db/conn.mjs";
import users from "./routes/users.mjs";
import  vans from "./routes/vans.mjs"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());

/* {
  origin: 'http://localhost:5173/', // use your actual domain name (or localhost), using * is not recommended
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
} */
app.use(express.json());

db.on('error', (error) => console.error(error))
db.once('open', ()=>{console.log('connected to database')})


app.use("/users", users) //link the users route to a /users path;
app.use("/vans", vans)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});