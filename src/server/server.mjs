import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"
import db from "./db/conn.mjs";

import authRoutes from "./routes/authRoutes.mjs"
import users from "./routes/users.mjs";
import vans from "./routes/vans.mjs"
import signUp from "./routes/signUp.mjs"
import login from "./routes/login.mjs"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

/* {
  origin: 'http://localhost:5173/', // use your actual domain name (or localhost), using * is not recommended
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
} */

//connecting mongodb to this entry point
db.on('error', (error) => console.error(error))
db.once('open', ()=>{console.log('Connected to Mongodb')})

//entry points
//app.use('/', authRoutes)
app.use("/users", users) //link the users route to a /users path;
app.use("/vans", vans)
app.use('/signup', signUp)
app.use("/login", login) 

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});