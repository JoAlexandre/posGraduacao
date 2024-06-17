const express = require('express')
const ClientController = require('./controller/client.controller.js')
const clientRouter = require("./routes/clients.route.js")
const consultaRouter = require("./routes/consulta.route.js")
const db = require('./repository/db.js')
const app = express()

app.use(express.json())
db.sync()

app.get("/", async (req, res) => {  
  res.status(200).send('Bootcamp desenvolvedor backend - Tópicos Especiais')
})
app.use('/client', clientRouter)
app.use('/consulta', consultaRouter)

app.use((err, req, res, next) => {
  console.log(`[error] - ${new Date().toLocaleString('pt-br')} ${req.method.toUpperCase()} ${req.originalUrl} ${err.message}`)
  res.status(400).send({err: err.message})
})


module.exports = app