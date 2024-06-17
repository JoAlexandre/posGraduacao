import Client from "../models/client.model.js";
import Product from "../models/product.model.js";
import Sale from "../models/sale.model.js";
import Supplier from "../models/supplier.model.js";

async function insertSale(sale) {
	try {
		return await Sale.create(sale);
	} catch (err) {
		throw err;
	}
}

async function getSales() {
	try {
		return await Sale.findAll({
			include: [
				{
					model: Product,
					include: [
						{model: Supplier}
					]
				},
				{
					model: Client
				},
				
			]
		});
	} catch (error) {
		throw error;
	}
}

async function getSale(id) {
	try {
		return await Sale.findByPk(id);
	} catch (err) {
		throw err;
	}
}
async function getSalesByProductId(id) {
	try {
		return await Sale.findAll({
			where: { productId: id },
			include: [
				{
					model: Product,
					include: [
						{model: Supplier}
					]
				},
				{model: Client},
			]
		});
	} catch (err) {
		throw err;
	}
}
async function getSalesByClientId(id) {
	try {
		return await Sale.findAll({ where: { clientId: id } });
	} catch (err) {
		throw err;
	}
}
async function getSalesBySupplierId(id) {
	try {
		return await Sale.findAll({
			include: [
				{
					model: Product,
					where: {
						supplierId: id
					}
				}
			]
		});
	} catch (err) {
		throw err;
	}
}

async function updateSale(sale) {
	try {
		await Sale.update({
			value: sale.value,
			date: sale.date,
			clientId: sale.clientId 
		}, {
			where: {
				saleId: sale.saleId,
			},
		});
		return await getSale(sale.saleId);
	} catch (err) {
		throw err;
	}
}

async function deleteSale(id) {
	try {
		return await Sale.destroy({
			where: {
				saleId: id,
			},
		});
	} catch (err) {
		throw err;
	}
}

export default {
	insertSale,
	getSales,
	getSale,
	updateSale,
	deleteSale,
	getSalesByProductId,
	getSalesByClientId,
	getSalesBySupplierId
};
