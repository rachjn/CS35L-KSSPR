import express from "express";
import bodyParser from "body-parser";
import users from "./api/users.js";
import cors from "cors";

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", users);

app.get("/bye", (req, res) => {
  res.send("Bye!");
});

app.listen(3001, () => {
  console.log(`server listening at http://localhost:3001`);
});
