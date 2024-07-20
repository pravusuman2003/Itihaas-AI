require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/:year?", async function (req, res) {
  const obj = await run(req.params.year);
  res.send(obj);
});

app.listen(3000);
const { run } = require("./gemini.js");
