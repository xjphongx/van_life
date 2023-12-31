import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"
import db from "./db/conn.mjs";
import cookieParser from "cookie-parser"

import users from "./routes/users.mjs";
import vans from "./routes/vans.mjs"
import signUp from "./routes/signUp.mjs"
import login from "./routes/login.mjs"
import logout from "./routes/logout.mjs"
import host from "./routes/host.mjs"
import user from "./routes/activeUser.mjs"
import requests from "./routes/requests.mjs"

const PORT = process.env.PORT || 5050;
const app = express();
const URL = "http://localhost:5173" //client side url

//connecting mongodb to this entry point
db.on('error', (error) => console.error(error))
db.once('open', ()=>{console.log('Connected to Mongodb')})

//middleware
app.use(cors({credentials:true, origin:URL})); //cors arguments for cookies 
app.use(express.json({limit:'50mb'}));
app.use(cookieParser())//used for JWT
app.use(express.urlencoded({extended:false}))//used for JWT

//entry points
//app.use('/', authRoutes)
app.use("/users", users) //link the users route to a /users path;
app.use("/vans", vans)
app.use('/signup', signUp)
app.use("/login", login)
app.use("/logout", logout) 
app.use("/host", host)
app.use("/user", user)
app.use("/requests", requests)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});