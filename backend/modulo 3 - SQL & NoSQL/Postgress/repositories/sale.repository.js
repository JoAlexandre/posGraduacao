import { connect } from "./db.js";

async function insertSale(sale) {
	const conn = await connect();
	try {
		const sql = `INSERT INTO sales(value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *`;
		const values = [
			sale.value,
			sale.date,
			sale.client_id,
			sale.product_id,
		];
		const res = await conn.query(sql, values);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function getSales() {
	const conn = await connect();
	try {
		const res = await conn.query(`SELECT * FROM sales`);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function getSalesByProductId(id) {
	const conn = await connect();
	try {
		const res = await conn.query(`SELECT * FROM sales WHERE product_id = $1`, [id]);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}
async function getSalesByClientId(id) {
	const conn = await connect();
	try {
		const res = await conn.query(`SELECT * FROM sales WHERE client_id = $1`, [id]);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function getSale(sale_id) {
	const conn = await connect();
	try {
		const sql = `SELECT * FROM sales where sale_id = $1`;
		const res = await conn.query(sql, [sale_id]);

		return res.rows[0];
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function updateSale(sale) {
	const conn = await connect();
	try {
		const sql = `UPDATE sales SET value = $1, date = $2, client_id = $3 WHERE sale_id = $4 RETURNING *`;
		const res = await conn.query(sql, [
			sale.value,
			sale.date,
			sale.client_id,
			sale.sale_id,
		]);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function deleteSale(sale_id) {
	const conn = await connect();
	try {
		const sql = `DELETE FROM sales where sale_id = $1`;
		const res = await conn.query(sql, [sale_id]);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

export default {
	insertSale,
	getSales,
	getSale,
	updateSale,
	deleteSale,
	getSalesByProductId,
	getSalesByClientId
};
