import LivroService from "../services/livro.service.js";

async function createLivro(req, res, next) {
	let livro = req.body;
	try {
		if (!livro.nome || livro.valor == null || livro.estoque == null || !livro.autorId )
			throw new Error("Nome, valor, qtd em estoque e AutorId são OBRIGATÓRIOS!");

		livro = await LivroService.createLivro(livro);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				livro
			)}`
		);

		res.send(livro);
	} catch (error) {
		next(error);
	}
}

async function updateLivro(req, res, next) {
	let livro = req.body;
	try {
		if (!livro.livroId || livro.valor == null )
			throw new Error("Id e Valor são OBRIGATÓRIOS!");

		livro = await LivroService.updateLivro(livro);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(livro)}`);

		res.send(livro);
	} catch (error) {
		next(error);
	}
}

async function getLivros(req, res, next) {
	const query = req.query
	try {
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
		res.send(await LivroService.getLivros(query.autorId));
	} catch (error) {
		next(error);
	}
}

async function getLivro(req, res, next) {
	const id = req.params.id;
	try {
		if (isNaN(parseInt(id)) || parseInt(id) == null)
			throw new Error("Livro não encontrado");

		const livro = await LivroService.getLivro(id);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(livro)}`);
		res.send(livro);
	} catch (error) {
		next(error);
	}
}

async function deleteLivro(req, res, next) {
	const id = req.params.id;
	try {
		if (isNaN(parseInt(id)) || parseInt(id) == null)
			throw new Error("Livro não encontrado");

		await LivroService.deleteLivro(id);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
		res.end();
	} catch (error) {
		next(error);
	}
}

async function createLivroInfo(req, res, next) {
	let livro = req.body;
	try {
		if (!livro.livroId) throw new Error("Id do Livro é OBRIGATÓRIO!");

		livro = await LivroService.createLivroInfo(livro);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				livro
			)}`
		);

		res.send(livro);
	} catch (error) {
		next(error);
	}
}

async function updateLivroInfo(req, res, next) {
	let livroInfo = req.body;
	try {
		if (!livroInfo.livroId || !livroInfo.descricao || livroInfo.paginas == null || !livroInfo.editora) throw new Error("Id, Descrição, Paginas e Editora do Livro são OBRIGATÓRIOS!");

		livroInfo = await LivroService.updateLivroInfo(livroInfo);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				livroInfo
			)}`
		);

		res.send(livroInfo);
	} catch (error) {
		next(error);
	}
}

async function deleteLivroInfo(req, res, next) {
	let id = req.params.id;
	try {
		if (!id) throw new Error("Id do Livro é OBRIGATÓRIO!");

		await LivroService.deleteLivroInfo(id);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
		res.end()
		
	} catch (error) {
		next(error);
	}
}

async function createAvaliacao(req, res, next) {
	let avaliacao = req.body;
	let id = req.params.id
	try {
		if (isNaN(parseInt(id)) || !avaliacao.nome || avaliacao.nota == null || !avaliacao.avaliacao) throw new Error("Id do Livro, Nome do Cliente, Nota e Avaliação são OBRIGATÓRIOS!");

		avaliacao = await LivroService.createAvaliacao(id, avaliacao);
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(avaliacao)}`);
		res.send(avaliacao)
		
	} catch (error) {
		next(error);
	}
}
export default { createLivro, getLivros, updateLivro, getLivro, deleteLivro, createLivroInfo, deleteLivroInfo, createAvaliacao, updateLivroInfo };
