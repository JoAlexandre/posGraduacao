import { connect } from "./db.js";

async function insertSupplier(supplier) {
	const conn = await connect();
	try {
		const sql = `INSERT INTO suppliers(name, cnpj, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
		const values = [
			supplier.name,
			supplier.cnpj,
			supplier.phone,
			supplier.email,
			supplier.address,
		];
		const res = await conn.query(sql, values);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function getSuppliers() {
	const conn = await connect();
	try {
		const res = await conn.query(`SELECT * FROM suppliers`);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function getSupplier(supplier_id) {
	const conn = await connect();
	try {
		const sql = `SELECT * FROM suppliers where supplier_id = $1`;
		const res = await conn.query(sql, [supplier_id]);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function updateSupplier(supplier) {
	const conn = await connect();
	try {
		const sql = `UPDATE suppliers SET name = $1, cnpj = $2, phone = $3, email = $4, address = $5 WHERE supplier_id = $6 RETURNING *`;
		const res = await conn.query(sql, [
			supplier.name,
			supplier.cnpj,
			supplier.phone,
			supplier.email,
			supplier.address,
			supplier.supplier_id,
		]);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function deleteSupplier(supplier_id) {
	const conn = await connect();
	try {
		const sql = `DELETE FROM suppliers where supplier_id = $1`;
		const res = await conn.query(sql, [supplier_id]);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

export default {
	insertSupplier,
	getSuppliers,
	getSupplier,
	updateSupplier,
	deleteSupplier,
};
