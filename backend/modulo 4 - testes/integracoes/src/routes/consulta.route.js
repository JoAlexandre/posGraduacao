const app = require('express').Router()

const ConsultaController = require('../controller/consulta.controller.js')

app.get('/', ConsultaController.getConsultas)
app.get('/:id', ConsultaController.getConsulta)
app.post('/', ConsultaController.createConsulta)



module.exports = app