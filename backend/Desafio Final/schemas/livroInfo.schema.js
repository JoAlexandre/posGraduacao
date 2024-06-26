import mongoose from "mongoose";
import AvaliacaoSchema from "./avaliacaoInfo.schema.js";
const LivroInfoSchema = new mongoose.Schema(
	{
		livroId: Number,
		descricao: String,
		paginas: Number,
		editora: String,
		avaliacoes: [AvaliacaoSchema],
	},
	{ collection: "livroInfo" }
);

export default LivroInfoSchema