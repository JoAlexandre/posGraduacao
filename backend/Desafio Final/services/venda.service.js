import VendaRespository from "../repository/venda.repository.js";
import LivroRepository from '../repository/livro.repository.js'
import ClientRepository from "../repository/client.repository.js";

async function getVendas(clientId, livroId, userEmail) {
  if (clientId) {
    if (userEmail != 'admin') {
      const user = await ClientRepository.getClientByEmail(userEmail)
      if(user.clientId != clientId) throw new Error("Você não pode consultar vendas de terceiros!")
    }
    return await VendaRespository.getVendaByClientId(clientId)
  }

  if (livroId) {
    return await VendaRespository.getVendaByLivroId(livroId)
  }

  return await VendaRespository.getVendas()
}
async function getVenda(id, user) {
  if (user == 'admin') {
    return await VendaRespository.getVenda(id)
  }

  const [venda, client] = await Promise.all([
    VendaRespository.getVenda(id),
    ClientRepository.getClientByEmail(user)
  ])
  
  if(venda.clientId != client.clientId) throw new Error("Você não pode consultar vendas de terceiros!")
  return venda
}

async function createVenda(venda, userEmail) {
  /**
   * 1° O valor da venda neste endpoint é buscada da tabela do livro e inserida no registro da venda
   * 2° antes de cadastrar a venda é necessário verificar se o livro tem estoque maior que zero. Se tiver, o endpoint deve permitir a inserção do registro e deve atualizar o estoque do livro
   * 3° O clienteId deve ser o do próprio usuário de cadastro
   */

  if (userEmail != 'admin') {
    const { clientId } = await ClientRepository.getClientByEmail(userEmail)
    if (clientId != venda.clientId ) throw new Error("Você não pode realizar uma compra fornecendo dados de terceiro!")
  }
  
  const livro = await LivroRepository.getLivro(venda.livroId)
  if (!livro) throw new Error("Livro não existe na base de dados.")
  if (livro.estoque <= 0) throw new Error("Livro sem estoque.")

  venda.valor = livro.valor
  livro.estoque--

  await LivroRepository.updateLivro(livro)
  return await VendaRespository.createVenda(venda);
}

async function updateVenda(venda) {
  return []
  return await VendaRespository.updateVenda(venda)
}

async function deleteVenda(id) {
  // if(await LivroRepository.getLivroByVendaId(id)) throw new Error("Venda não pode ser deletado com livro cadastrado em seu nome.")
  return []
  return await VendaRespository.deleteVenda(id)
}

export default { createVenda, getVendas, updateVenda, getVenda, deleteVenda };
