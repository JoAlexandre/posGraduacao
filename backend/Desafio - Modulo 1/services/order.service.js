import OrderRepository from "../repositories/order.repository.js";

async function createOrder(order) {
	return await OrderRepository.createOrder(order);
}

async function getOrders() {
	return await OrderRepository.getOrders();
}

async function updateOrder(order) {
	return await OrderRepository.updateOrder(order);
}

async function updateDelivery(order) {
	return await OrderRepository.updateDelivery(order);
}
async function deleteOrders(orderId) {
	return await OrderRepository.deleteOrders(orderId);
}
async function getOrdersById(orderId) {
	return await OrderRepository.getOrdersById(orderId);
}
async function getOrdersByName(cliente) {
	return await OrderRepository.getOrdersByName(cliente);
}
async function getTotalValorProdutos(produto) {
	return await OrderRepository.getTotalValorProdutos(produto);
}
async function getProdutosMaisVendidos(produto) {
	return await OrderRepository.getProdutosMaisVendidos(produto);
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
