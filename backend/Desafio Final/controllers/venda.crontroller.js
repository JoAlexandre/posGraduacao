import VendaService from "../services/venda.service.js";

async function createVenda(req, res, next) {
	let venda = req.body;
	const { user } = req.auth;
	try {
		if (!venda.data || venda.clientId == null || venda.livroId == null)
			throw new Error(
				"Data da venda, Id do cliente e Id do livro são OBRIGATÓRIOS!"
			);

		venda = await VendaService.createVenda(venda, user);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				venda
			)}`
		);

		res.send(venda);
	} catch (error) {
		next(error);
	}
}

async function updateVenda(req, res, next) {
	let venda = req.body;
	try {
		if (!venda.vendaId || !venda.nome || !venda.email || !venda.telefone)
			throw new Error(
				"ID, Nome, email, senha, telefone e endereço são OBRIGATÓRIOS!"
			);

		venda = await VendaService.updateVenda(venda);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				venda
			)}`
		);

		res.send(venda);
	} catch (error) {
		next(error);
	}
}

async function getVendas(req, res, next) {
	const { clientId, livroId } = req.query;
	const { user } = req.auth;
	try {
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
		res.send(await VendaService.getVendas(clientId, livroId, user));
	} catch (error) {
		next(error);
	}
}

async function getVenda(req, res, next) {
	const id = req.params.id;
	const { user } = req.auth;
	try {
		if (isNaN(parseInt(id)) || parseInt(id) == null)
			throw new Error("Venda não encontrado");

		const venda = await VendaService.getVenda(id, user);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				venda
			)}`
		);
		res.send(venda);
	} catch (error) {
		next(error);
	}
}
async function deleteVenda(req, res, next) {
	const id = req.params.id;

	try {
		if (isNaN(parseInt(id)) || parseInt(id) == null)
			throw new Error("Venda não encontrado");

		await VendaService.deleteVenda(id);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
		res.end();
	} catch (error) {
		next(error);
	}
}

export default { createVenda, getVendas, updateVenda, getVenda, deleteVenda };
