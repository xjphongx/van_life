import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"
import users from "./routes/users.mjs";
import vans from "./routes/vans.mjs"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", users) //link the users route to a /users path;
app.use("/vans", vans)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});