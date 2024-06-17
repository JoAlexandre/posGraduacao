const Consultas = require("../models/consulta.model.js");
const sequelize = require("sequelize")
async function getConsultas() {
	try {
		const data = await Consultas.findAll();
		return data;
	} catch (error) {
		throw error;
	}
}

async function getLastConsulta(cpf) {
	try {
		const data = await Consultas.findOne({
			where: { client_cpf: cpf },
			order: [[sequelize.col("created_at"), "DESC"]],
			raw: true,
		});
		return data;
	} catch (error) {
		throw error;
	}
}

async function getConsulta(cpf) {
	try {
		const data = await Consultas.findAll({
			where: { client_cpf: cpf },
			raw: true,
		});
		return data;
	} catch (error) {
		throw error;
	}
}

async function createConsulta(consulta) {
	try {
		const data = await Consultas.create(consulta, { raw: true });
		return data;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getConsultas,
	getConsulta,
	createConsulta,
	getLastConsulta,
};
