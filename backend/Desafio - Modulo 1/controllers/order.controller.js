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

import OrderService from "../services/order.service.js";
async function createOrder(req, res, next) {
	try {
		let order = req.body;
		if (!order.cliente || !order.produto || order.valor == null) {
			throw new Error("Cliente, Produto e Valor são obrigatórios");
		}

		order = await OrderService.createOrder(order);

		console.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				order
			)}`
		);

		return res.send(order);
	} catch (error) {
		next(error);
	}
}
async function getOrders(req, res, next) {
	try {
		return res.send(await OrderService.getOrders());
	} catch (error) {
		next(error);
	}
}
async function updateOrder(req, res, next) {
	try {
		let order = req.body;
		if (
			!order.cliente ||
			!order.produto ||
			order.valor == null ||
			order.id == null
		) {
			throw new Error("ID, Cliente, Produto e Valor são obrigatórios");
		}

		order = await OrderService.updateOrder(order);

		console.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				order
			)}`
		);

		return res.send(order);
	} catch (error) {
		next(error);
	}
}
async function updateDelivery(req, res, next) {
	try {
		let order = req.body;
		console.log(order);
		if (order.id == null || order.entregue == null) {
			throw new Error("ID e Entregue são obrigatórios");
		}

		order = await OrderService.updateDelivery(order);

		console.info(
			`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(
				order
			)}`
		);

		return res.send(order);
	} catch (error) {
		next(error);
	}
}
async function deleteOrders(req, res, next) {
	try {
		let id = req.params.id;
		if (id == null) {
			throw new Error("ID obrigatório");
		}
		await OrderService.deleteOrders(id);
		console.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${id}`);

		return res.end();
	} catch (error) {
		next(error);
	}
}

async function getOrdersById(req, res, next) {
	try {
		let id = req.params.id;
		if (id == null) {
			throw new Error("ID obrigatório");
		}
		const order = await OrderService.getOrdersById(id);
		console.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${id}`);

		return res.send(order);
	} catch (error) {
		next(error);
	}
}

async function getTotalPedidosCliente(req, res, next) {
	try {
		let cliente = req.body.cliente;
		if (!cliente) {
			throw new Error("Cliente não Informado");
		}
		const total = await OrderService.getOrdersByName(cliente);
		console.info(
			`${req.method.toUpperCase()} ${
				req.originalUrl
			} - ${cliente} - total: ${total}`
		);

		return res.send(String(total));
	} catch (error) {
		next(error);
	}
}
async function getTotalValorProdutos(req, res, next) {
	try {
		let produto = req.body.produto;
		if (!produto) {
			throw new Error("Produto não Informado");
		}
		const total = await OrderService.getTotalValorProdutos(produto);
		console.info(
			`${req.method.toUpperCase()} ${
				req.originalUrl
			} - ${produto} - total: ${total}`
		);

		return res.send(String(total));
	} catch (error) {
		next(error);
	}
}
async function getProdutosMaisVendidos(req, res, next) {
	try {
		const total = await OrderService.getProdutosMaisVendidos();
		console.info(
			`${req.method.toUpperCase()} ${req.originalUrl}: ${JSON.stringify(total)}`
		);

		return res.send(total);
	} catch (error) {
		next(error);
	}
}

export default {
	createOrder,
	getOrders,
	updateOrder,
	updateDelivery,
	deleteOrders,
	getOrdersById,
	getTotalPedidosCliente,
	getTotalValorProdutos,
	getProdutosMaisVendidos,
};
