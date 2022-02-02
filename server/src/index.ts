import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (_, res) => {
  res.send("hello world");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening to port : ${port}`);
});
