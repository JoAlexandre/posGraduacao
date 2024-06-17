import ClientService from "../services/client.service.js"

async function createClient(req, res, next) {
  let client = req.body
  
  try {
    if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
      throw new Error('Existem parametros obrigatórios que NÃO FORAM informados')
    } 

    client = await ClientService.createClient(client)
    res.send(client)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(client, null, 2)}`)
  } catch (error) {
    next(error)
  }
}

async function getClients(req, res, next) {
  
  try {
    res.send(await ClientService.getClients())
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}
async function getClient(req, res, next) {
  const client_id = req.params.client_id
  try {
    if (client_id == null) {
      throw new Error("client_id not found")
    }
    res.send(await ClientService.getClient(client_id))
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}

async function deleteClient(req, res, next) {
  const client_id = req.params.client_id
  try {
    if (client_id == null) {
      throw new Error("client not found")
    }
    await ClientService.deleteClient(client_id)
    res.end()
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}

async function updateClient(req, res, next) {
  let client = req.body
  
  try {
    if (!client.clientId || !client.name || !client.cpf || !client.phone || !client.email || !client.address) {
      throw new Error('Existem parametros obrigatórios que NÃO FORAM informados')
    } 

    client = await ClientService.updateClient(client)
    res.send(client)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(client, null, 2)}`)
  } catch (error) {
    next(error)
  }
}

export default  {
  createClient, getClients, getClient, deleteClient, updateClient
}