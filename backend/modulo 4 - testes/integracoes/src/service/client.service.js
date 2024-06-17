const ClientRepository = require('../repository/client.repository.js')
async function getClients() {
  return await ClientRepository.getClients()
}

async function getClient(cpf) {
  return await ClientRepository.getClient(cpf)
}

async function createClient(cpf) {
  return await ClientRepository.createClient(cpf)
}

module.exports = { getClients, getClient, createClient }