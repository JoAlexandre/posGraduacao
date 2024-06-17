const app = require('express').Router()
const ClientController = require('../controller/client.controller.js')

app.get('/', ClientController.getClients)
app.get('/:id', ClientController.getClient)
app.post('/', ClientController.createClient)


module.exports = app