const ConsultaRepository = require("../repository/consulta.repository.js");
const ClientRepository = require("../repository/client.repository.js");
const calculaValor = require("../calculaValor.js");
async function getConsultas() {
	return await ConsultaRepository.getConsultas();
}

async function getConsulta(cpf) {
	return await ConsultaRepository.getConsulta(cpf);
}
async function getLastConsulta(cpf) {
	return await ConsultaRepository.getLastConsulta(cpf);
}

async function createConsulta(consulta) {
  const juros = 0.025
	try {
		let [client, ultimaConsulta] = await Promise.all([
			ClientRepository.getClient(consulta.cpf),
			ConsultaRepository.getLastConsulta(consulta.cpf),
		]);
		if (!client) {
			client = await ClientRepository.createClient({
				nome: consulta.nome,
				cpf: consulta.cpf,
			});
		}

		if (ultimaConsulta) {
			const dataDesdeUltimaConsulta = Math.abs(
				ultimaConsulta.emissao.getTime() - new Date().getTime()
			);
			const diferencaEmDias = Math.round(
				dataDesdeUltimaConsulta / (1000 * 60 * 60 * 24)
			);

			if (diferencaEmDias <= 30)
				throw new Error(
					`Impossível realizar consulta. Última consulta realizada á ${diferencaEmDias} dias.`
				);
		}

		const montante = calculaValor.calcularMontante(
			parseFloat(consulta.valor),
			juros,
			parseInt(consulta.qtde_prestacoes)
		);
		const prestacoes = calculaValor.calcularPrestacoes(
			montante,
			consulta.qtde_prestacoes
		);

		return await ConsultaRepository.createConsulta({
				emissao: new Date(),
				valor: consulta.valor,
				qtde_prestacoes: consulta.qtde_prestacoes,
				montante,
				prestacoes: JSON.stringify(prestacoes),
				client_cpf: consulta.cpf,
				juros
			})
	} catch (error) {
		throw error;
	}
}

module.exports = { getConsultas, getConsulta, createConsulta, getLastConsulta };
