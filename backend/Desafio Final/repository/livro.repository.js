import Livro from "../models/livro.model.js";
import { connect } from "./mongo.db.js";
import VendaRepository from "./venda.repository.js";
import LivroInfoRepository from "./livroInfo.repository.js";

async function getLivros() {
	try {
		const data = await Livro.findAll({ raw: true });
		return data;
	} catch (error) {
		throw error;
	}
}

async function getLivro(livroId) {
	try {
		const data = await Livro.findByPk(livroId, { raw: true });

		if (!data) return null
		
		data.info = await LivroInfoRepository.getLivroInfo(livroId) || {}

		return data;
	} catch (error) {
		throw error;
	}
}

async function getLivroByAutorId(autorId) {
	try {
		const livros = await Livro.findAll({ where: { autorId }, raw: true });
		for await (let livro of livros) {
			const index = livros.findIndex(o => o.livroId == livro.livroId)
			const vendas = await VendaRepository.getVendaByLivroId(livro.livroId)
			livros[index].vendas = vendas
		}
		return livros;
	} catch (error) {
		throw error;
	}
}

async function createLivro(livro) {
	try {
		const data = await Livro.create(livro, { raw: true, returning: "*" });
		return data;
	} catch (error) {
		throw error;
	}
}

async function updateLivro(livro) {
	try {
		const [_, data] = await Livro.update(
			{
				valor: livro.valor,
				estoque: livro.estoque,
			},
			{
				where: {
					livroId: livro.livroId,
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

async function deleteLivro(livroId) {
	try {
		return await Livro.destroy({ where: { livroId } });
	} catch (error) {
		throw error;
	}
}

export default {
	getLivros,
	createLivro,
	updateLivro,
	getLivro,
	deleteLivro,
	getLivroByAutorId,
};
