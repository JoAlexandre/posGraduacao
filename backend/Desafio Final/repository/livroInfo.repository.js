import LivroInfoSchema from "../schemas/livroInfo.schema.js";
import { connect } from "./mongo.db.js";

async function createLivroInfo(livroInfo) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		livroInfo = new LivroInfo(livroInfo)
		return await livroInfo.save();
	} catch (error) {
		throw error;
	}
}

async function getLivroInfo(livroId) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		return await LivroInfo.findOne({ livroId }).exec();
	} catch (error) {
		throw error;
	}
}

async function getLivroInfos(livroId) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		return await LivroInfo.find({ livroId }).exec();
	} catch (error) {
		throw error;
	}
}

async function deleteLivroInfo(livroId) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		return await LivroInfo.deleteOne({ livroId })
	} catch (error) {
		throw error;
	}
}

async function updateLivroInfo(livro) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		await LivroInfo.findOneAndUpdate({ livroId: livro.livroId }, livro)
	} catch (error) {
		throw error;
	}
}

async function createAvaliacao(livroId, avaliacao) {
	try {
		let livroInfo = await getLivroInfo(livroId)
		
		livroInfo.avaliacoes.push(avaliacao)

		await updateLivroInfo(livroInfo)

	} catch (error) {
		throw error;
	}
}

export default { getLivroInfo, getLivroInfos, createLivroInfo, deleteLivroInfo, updateLivroInfo, createAvaliacao };
