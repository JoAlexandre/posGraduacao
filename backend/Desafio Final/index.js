import express from "express";
import db from "./repository/db.js";

const app = express()

app.use(express.json())

app.listen(3002, async () => {
  await db.sync()
  console.log('Api Desafio Final is running!') 
})