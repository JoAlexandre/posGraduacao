import ClientRespository from "../repository/client.repository.js";
import VendaRepository from '../repository/venda.repository.js'

async function getClients() {
  return await ClientRespository.getClients()
}
async function getClient(id) {
  return await ClientRespository.getClient(id)
}

async function createClient(client) {
	return await ClientRespository.createClient(client);
}

async function updateClient(client) {
  return await ClientRespository.updateClient(client)
}

async function deleteClient(id) {
  if(await VendaRepository.getVenda(id)) throw new Error("Cliente não pode ser deletado com venda atribuida a ele.")
  return await ClientRespository.deleteClient(id)
}

export default { createClient, getClients, updateClient, getClient, deleteClient };
