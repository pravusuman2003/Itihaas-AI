require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { run } = require("./gemini.js");

const app = express();

app.use(cors(
    {
    origin: ["https://itihaas-ai.vercel.app/"],
    methods: ["POST","GET"],
    credentials:true
  }
));


app.get("/:year?/:interest", async function (req, res) {
  try{
    const obj = await run(req.params.year,req.params.interest);
    res.send(obj);
    console.log("data sent to client");
  }
  catch(error){
    res.status(500).send("error : invalid response from gemini");
  }
});

app.listen(3000, ()=>{
  console.log("server started successfully");
});
