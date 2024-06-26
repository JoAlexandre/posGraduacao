import Client from "../models/client.model.js";

async function getClients() {
	try {
		const data = await Client.findAll({
			raw: true,
			attributes: { exclude: "senha" },
		});
		return data;
	} catch (error) {
		throw error;
	}
}

async function getClient(clientId) {
	try {
		const data = await Client.findByPk(clientId, {
			raw: true,
			attributes: { exclude: "senha" },
		});

		if (!data) throw new Error("Cliente não encontrado.");
		return data;
	} catch (error) {
		throw error;
	}
}

async function createClient(client) {
	try {
		const data = await Client.create(client, { raw: true, returning: "*" });
		return data;
	} catch (error) {
		throw error;
	}
}

async function updateClient(client) {
	try {
		const [_, data] = await Client.update(
			{
				nome: client.nome,
				email: client.email,
				senha: client.senha,
				telefone: client.telefone,
				endereco: client.endereco,
			},
			{
				where: {
					clientId: client.clientId,
				},
				returning: true,
				raw: true,
				attributes: { exclude: "senha" },
			}
		);
		return data[0];
	} catch (error) {
		throw error;
	}
}

async function deleteClient(clientId) {
	try {
		return await Client.destroy({ where: { clientId } });
	} catch (error) {
		throw error;
	}
}

async function getClientByNameAndPassword(client) {
	try {
		const data = await Client.findOne({
			where: client,
			raw: true,
			attributes: { exclude: "senha" },
		});

		return data;
	} catch (error) {
		throw error;
	}
}
async function getClientByEmail(email) {
	try {
		const data = await Client.findOne({
			where: {email},
			raw: true,
			attributes: { exclude: "senha" },
		});

		return data;
	} catch (error) {
		throw error;
	}
}

export default {
	getClients,
	createClient,
	updateClient,
	getClient,
	deleteClient,
	getClientByNameAndPassword,
	getClientByEmail
};
