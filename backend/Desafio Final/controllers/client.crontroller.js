import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
	let client = req.body;
	try {
		if (!client.nome ||!client.email ||!client.senha ||!client.telefone ||!client.endereco) throw new Error("Nome, email, senha, telefone e endereço são OBRIGATÓRIOS!");

		client = await ClientService.createClient(client);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				client
			)}`
		);

		res.send(client);
	} catch (error) {
		next(error);
	}
}

async function updateClient(req, res, next) {
	let client = req.body;
	try {
		if (!client.clientId || !client.nome ||!client.email ||!client.senha ||!client.telefone ||!client.endereco) throw new Error("Id, Nome, email, senha, telefone e endereço são OBRIGATÓRIOS!");

		client = await ClientService.updateClient(client);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(client)}`);

		res.send(client);
	} catch (error) {
		next(error);
	}
}

async function getClients(req, res, next) {
	try {

    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
		res.send( await ClientService.getClients());
	} catch (error) {
		next(error);
	}
}

async function getClient(req, res, next) {
	const id = req.params.id
	try {
		if (isNaN(parseInt(id)) || parseInt(id) == null) throw new Error("Cliente não encontrado")
		const client =  await ClientService.getClient(id)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(client)}`);
		res.send( client);
	} catch (error) {
		next(error);
	}
}
async function deleteClient(req, res, next) {
	const id = req.params.id
	try {
		if (isNaN(parseInt(id)) || parseInt(id) == null) throw new Error("Cliente não encontrado")
		await ClientService.deleteClient(id)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
		res.end();
	} catch (error) {
		next(error);
	}
}

export default { createClient, getClients, updateClient, getClient, deleteClient };
