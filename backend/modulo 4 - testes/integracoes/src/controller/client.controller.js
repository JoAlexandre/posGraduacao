const ClientService = require('../service/client.service.js')
async function getClients(req, res, next) {
  try {
    
    console.dir(`${new Date().toLocaleString('pt-br')} ${req.method.toUpperCase()} ${req.originalUrl} `)
    res.send(await ClientService.getClients())
  } catch (error) {
    next(error)
  }
}

async function getClient(req, res, next) {
  try {
    const cpf = req.params.id
    
    const client = await ClientService.getClient(cpf)
    res.send(client)

    console.dir(`${new Date().toLocaleString('pt-br')} ${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(client)}`)
  } catch (error) {
    next(error)
  }
}

async function createClient(req, res, next) {
  try {
    let client = req.body
    
    client = await ClientService.createClient(client)
    res.send(client)

    console.dir(`${new Date().toLocaleString('pt-br')} ${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(client)}`)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getClients, getClient, createClient
}