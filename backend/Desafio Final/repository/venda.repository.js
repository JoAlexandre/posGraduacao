import Venda from "../models/venda.model.js";

async function getVendas() {
	try {
		const data = await Venda.findAll({ raw: true });
		return data;
	} catch (error) {
		throw error;
	}
}

async function getVenda(clientId) {
	try {
		const data = await Venda.findOne({ where: { clientId } }, { raw: true });
		return data;
	} catch (error) {
		throw error;
	}
}

async function createVenda(venda) {
	try {
		const data = await Venda.create(venda, { raw: true, returning: "*" });
		return data;
	} catch (error) {
		throw error;
	}
}

async function updateVenda(venda) {
	try {
		const [_, data] = await Venda.update(
			{
				nome: venda.nome,
				email: venda.email,
				senha: venda.senha,
				telefone: venda.telefone,
				endereco: venda.endereco,
			},
			{
				where: {
					vendaId: venda.vendaId,
				},
				returning: true,
				raw: true,
			}
		);
		return data[0];
	} catch (error) {
		throw error;
	}
}
async function deleteVenda(vendaId) {
	try {
		return await Venda.destroy({ where: { vendaId } });
	} catch (error) {
		throw error;
	}
}

export default { getVendas, createVenda, updateVenda, getVenda, deleteVenda };
