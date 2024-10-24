import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/bye", (req, res) => {
  res.send("Bye!");
});

app.listen(3001, () => {
  console.log(`server listening at http://localhost:3001`);
});
