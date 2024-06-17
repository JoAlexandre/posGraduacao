const Clients = require("../models/clients.model.js");
async function getClients() {
	try {
		const data = await Clients.findAll();
		return data;
	} catch (error) {
		throw error;
	}
}

async function getClient(cpf) {
	try {
		const data = await Clients.findByPk(cpf, { raw: true });
		return data;
	} catch (error) {
		throw error;
	}
}
async function createClient(client) {
	try {
		const data = await Clients.create(client, {raw: true});
		return data;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getClients, getClient, createClient
};
