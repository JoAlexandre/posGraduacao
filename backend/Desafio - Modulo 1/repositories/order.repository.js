import { promises as fs } from "fs";
const { readFile, writeFile } = fs;
const nomeArquivo = "pedidos.json";

/**
 * 
{
  "id": 1,
  "cliente": "Lavínia Dâmaso",
  "produto": "Pizza Muçarela",
  "valor": 26,
  "entregue": true,
  "timestamp": "2021-05-02T19:48:09.765Z"
},

 * 
 * 
 */

async function writeF(data) {
	return await writeFile(nomeArquivo, JSON.stringify(data, null, 2));
}

async function createOrder(order) {
	const data = JSON.parse(await readFile(nomeArquivo));

	order = {
		id: data.nextId,
    cliente: order.cliente,
		produto: order.produto,
		valor: order.valor,
		timestamp: new Date(),
		entregue: false,
	};
	data.nextId++;
	data.pedidos.push(order);

	await writeF(data);
	return order;
}

async function getOrders() {
	const data = JSON.parse(await readFile(nomeArquivo));

	return data.pedidos;
}

async function updateOrder(order) {
  const data = JSON.parse(await readFile(nomeArquivo));
  console.log(order, data)
  
  const indexOrder = data.pedidos.findIndex(ord => ord.id == order.id)
  
  if (indexOrder === -1) {
    throw new Error("ID não encontrado para atualização")
  }

  data.pedidos[indexOrder].cliente = order.cliente,
  data.pedidos[indexOrder].produto = order.produto,
  data.pedidos[indexOrder].valor = order.valor,
  data.pedidos[indexOrder].entregue = order.entregue,

	await writeF(data);
	return data.pedidos[indexOrder];
}

async function updateDelivery(order) {
  const data = JSON.parse(await readFile(nomeArquivo));
  
  const indexOrder = data.pedidos.findIndex(ord => ord.id == order.id)
  
  if (indexOrder === -1) {
    throw new Error("Produto não encontrado para atualização")
  }

  data.pedidos[indexOrder].entregue = order.entregue,

	await writeF(data);
	return data.pedidos[indexOrder];
}

async function deleteOrders(orderId) {
  let data = JSON.parse(await readFile(nomeArquivo));
  data.pedidos = data.pedidos.filter(item => item.id != orderId)
	return await writeF(data);
}
async function getOrdersById(orderId) {
  let data = JSON.parse(await readFile(nomeArquivo));
	return data.pedidos.find(item => item.id == orderId);
}
async function getOrdersByName(cliente) {
  let data = JSON.parse(await readFile(nomeArquivo));
  console.log(cliente)
  const pedidosEntregues = data.pedidos.filter(item => String(item.cliente).toLowerCase() == cliente.toLowerCase() && item.entregue)
	return pedidosEntregues.reduce((p, c) => p + c.valor, 0);
}
async function getTotalValorProdutos(produto) {
  let data = JSON.parse(await readFile(nomeArquivo));
  const pedidosEntregues = data.pedidos.filter(item => String(item.produto.toLowerCase()) == produto.toLowerCase() && item.entregue)
	return pedidosEntregues.reduce((p, c) => p + c.valor, 0);
}
async function getProdutosMaisVendidos(produto) {
  let data = JSON.parse(await readFile(nomeArquivo));
  let produtosVendidos = data
    .pedidos
    .filter((i, n, s) => s.findIndex(o => o.produto === i.produto) == n)
    .map(item => ({ produto: item.produto, totalVendido: data.pedidos.filter(o => o.produto == item.produto && o.entregue).length }))
    .sort((a, b) => b.totalVendido - a.totalVendido)
  .map(item => `${item.produto} - ${item.totalVendido}`)
  return produtosVendidos
}

export default {
	createOrder,
	getOrders,
  updateOrder,
  updateDelivery,
  deleteOrders,
  getOrdersById,
  getOrdersByName,
  getTotalValorProdutos,
  getProdutosMaisVendidos
};
