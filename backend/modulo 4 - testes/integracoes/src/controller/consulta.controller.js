const ConsultaService = require("../service/consulta.service.js");
async function getConsultas(req, res, next) {
	try {
		console.dir(
			`${new Date().toLocaleString("pt-br")} ${req.method.toUpperCase()} ${
				req.originalUrl
			} `
		);
		res.send(await ConsultaService.getConsultas());
	} catch (error) {
		next(error);
	}
}

async function getConsulta(req, res, next) {
	try {
		const cpf = req.params.id;

		const consulta = await ConsultaService.getConsulta(cpf);
		res.send(consulta);

		console.dir(
			`${new Date().toLocaleString("pt-br")} ${req.method.toUpperCase()} ${
				req.originalUrl
			} ${JSON.stringify(consulta)}`
		);
	} catch (error) {
		next(error);
	}
}
async function getLastConsulta(req, res, next) {
	try {
		const cpf = req.params.id;

		const consulta = await ConsultaService.getConsulta(cpf);
		res.send(consulta);

		console.dir(
			`${new Date().toLocaleString("pt-br")} ${req.method.toUpperCase()} ${
				req.originalUrl
			} ${JSON.stringify(consulta)}`
		);
	} catch (error) {
		next(error);
	}
}

async function createConsulta(req, res, next) {
	try {
		let consulta = req.body;

		if (
			!consulta.nome ||
			!consulta.cpf ||
			consulta.valor == null ||
			consulta.qtde_prestacoes == null
		)
			throw new Error("Nome/CPF do client e Valor/Qtde_Prestações do Emprestimo são obrigatórios");

		consulta = await ConsultaService.createConsulta(consulta);
		res.send(consulta);

		console.dir(
			`${new Date().toLocaleString("pt-br")} ${req.method.toUpperCase()} ${
				req.originalUrl
			} ${JSON.stringify(consulta)}`
		);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getConsultas,
	getConsulta,
	createConsulta,
};
