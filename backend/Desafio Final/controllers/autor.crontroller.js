import AutorService from "../services/autor.service.js";

async function createAutor(req, res, next) {
	let autor = req.body;
	try {
		if (!autor.nome || !autor.email || !autor.telefone)
			throw new Error("Nome, email e telefone são OBRIGATÓRIOS!");

		autor = await AutorService.createAutor(autor);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				autor
			)}`
		);

		res.send(autor);
	} catch (error) {
		next(error);
	}
}

async function updateAutor(req, res, next) {
	let autor = req.body;
	try {
		if (!autor.autorId || !autor.nome || !autor.email || !autor.telefone)
			throw new Error("ID, Nome, email, senha, telefone e endereço são OBRIGATÓRIOS!");

		autor = await AutorService.updateAutor(autor);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(autor)}`);

		res.send(autor);
	} catch (error) {
		next(error);
	}
}

async function getAutors(req, res, next) {
	try {
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
		res.send(await AutorService.getAutors());
	} catch (error) {
		next(error);
	}
}

async function getAutor(req, res, next) {
	const id = req.params.id;
	try {
		if (isNaN(parseInt(id)) || parseInt(id) == null)
			throw new Error("Autor não encontrado");

		const autor = await AutorService.getAutor(id);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(autor)}`);
		res.send(autor);
	} catch (error) {
		next(error);
	}
}
async function deleteAutor(req, res, next) {
	const id = req.params.id;
	try {
		if (isNaN(parseInt(id)) || parseInt(id) == null)
			throw new Error("Autor não encontrado");

		await AutorService.deleteAutor(id);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
		res.end();
	} catch (error) {
		next(error);
	}
}

export default { createAutor, getAutors, updateAutor, getAutor, deleteAutor };
