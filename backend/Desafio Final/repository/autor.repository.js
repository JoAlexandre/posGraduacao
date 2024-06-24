import Autor from "../models/autor.model.js";

async function getAutors() {
	try {
		const data = await Autor.findAll({ raw: true });
		return data;
	} catch (error) {
		throw error;
	}
}

async function getAutor(autorId) {
	try {
		const data = await Autor.findByPk(autorId, { raw: true });

		return data;
	} catch (error) {
		throw error;
	}
}

async function createAutor(autor) {
	try {
		const data = await Autor.create(autor, { raw: true, returning: "*" });
		return data;
	} catch (error) {
		throw error;
	}
}

async function updateAutor(autor) {
	try {
		const [_, data] = await Autor.update(
			{
				nome: autor.nome,
				email: autor.email,
				telefone: autor.telefone,
			},
			{
				where: {
					autorId: autor.autorId,
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

async function deleteAutor(autorId) {
	try {
		return await Autor.destroy({ where: { autorId } });
	} catch (error) {
		throw error;
	}
}

export default {
	getAutors,
	createAutor,
	updateAutor,
	getAutor,
	deleteAutor,
};
