import AutorRepository from '../repository/autor.repository.js'
import VendaRepository from '../repository/venda.repository.js'
import LivroRepository from '../repository/livro.repository.js'
import LivroInfoRepository from '../repository/livroInfo.repository.js'

async function getLivros(autorId) {
  if (autorId) {
    return await LivroRepository.getLivroByAutorId(autorId)
  }
  return await LivroRepository.getLivros()
}
async function getLivro(id) {
  return await LivroRepository.getLivro(id)
}

async function createLivro(livro) {
  if(!await AutorRepository.getAutor(livro.autorId)) throw new Error("Impossivel criar livro sem cadastro do autor especificado.")
	return await LivroRepository.createLivro(livro);
}

async function updateLivro(livro) {
  return await LivroRepository.updateLivro(livro)
}

async function deleteLivro(id) {
  if(await VendaRepository.getVendaByLivroId(id)) throw new Error("Livro não pode ser deletado com livro venda do mesmo realizada.")
  return await LivroRepository.deleteLivro(id)
}


async function createLivroInfo(livroInfo) {
  if(!await LivroRepository.getLivro(livroInfo.livroId)) throw new Error("Livro não consta na base de dados.")
  if(await LivroInfoRepository.getLivroInfo(parseInt(livroInfo.livroId))) throw new Error("Informações ja cadastradas para o livro especificado.")
	return await LivroInfoRepository.createLivroInfo(livroInfo);
}
async function updateLivroInfo(livroInfo) {
  if(!await LivroRepository.getLivro(livroInfo.livroId)) throw new Error("Livro não consta na base de dados.")
	return await LivroInfoRepository.updateLivroInfo(livroInfo);
}

async function deleteLivroInfo(id) {
	return await LivroInfoRepository.deleteLivroInfo(parseInt(id));
}
async function createAvaliacao(id, avaliacao) {
	return await LivroInfoRepository.createAvaliacao(parseInt(id), avaliacao);
}
async function deleteAvaliacao(id, index) {
	return await LivroInfoRepository.deleteAvaliacao(parseInt(id), parseInt(index));
}

export default { createLivro, getLivros, updateLivro, getLivro, deleteLivro, createLivroInfo, deleteLivroInfo, createAvaliacao, updateLivroInfo, deleteAvaliacao };
