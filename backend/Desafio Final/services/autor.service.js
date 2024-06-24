import AutorRespository from "../repository/autor.repository.js";
import LivroRepository from '../repository/livro.repository.js'

async function getAutors() {
  return await AutorRespository.getAutors()
}
async function getAutor(id) {
  return await AutorRespository.getAutor(id)
}

async function createAutor(autor) {
	return await AutorRespository.createAutor(autor);
}

async function updateAutor(autor) {
  return await AutorRespository.updateAutor(autor)
}

async function deleteAutor(id) {
  if(await LivroRepository.getLivroByAutorId(id)) throw new Error("Autor não pode ser deletado com livro cadastrado em seu nome.")
  return await AutorRespository.deleteAutor(id)
}

export default { createAutor, getAutors, updateAutor, getAutor, deleteAutor };
