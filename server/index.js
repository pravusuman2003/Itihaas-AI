require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { run } = require("./gemini.js");

const app = express();

app.use(cors());


app.get('/proxy/:year/:interest', async (req, res) => {
  const { year, interest } = req.params;
  const response = await fetch(`https://itihaas-ai-api.vercel.app/${year}/${interest}`);
  const data = await response.json();
  res.json(data);
});

app.listen(3000, ()=>{
  console.log("server started successfully");
});