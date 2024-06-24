import Client from "../models/client.model";

async function getClients() {
  try {
    const data = await Client.findAll({ raw: true })
    return data
  } catch (error) {
    throw error
  }
}

export default {getClients}