import { connect } from "./db.js";

async function insertClient(client) {
	const conn = await connect();
	try {
		const sql = `INSERT INTO clients(name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
		const values = [
			client.name,
			client.cpf,
			client.phone,
			client.email,
			client.address,
		];
		const res = await conn.query(sql, values);

		return res.rows[0];
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function getClients() {
	const conn = await connect();
	try {
		const res = await conn.query(`SELECT * FROM clients`);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function getClient(client_id) {
	const conn = await connect();
	try {
		const sql = `SELECT * FROM clients where client_id = $1`;
		const res = await conn.query(sql, [client_id]);

		return res.rows[0];
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function updateClient(client) {
	const conn = await connect();
	try {
		const sql = `UPDATE clients SET name = $1, cpf = $2, phone = $3, email = $4, address = $5 WHERE client_id = $6 RETURNING *`;
		const res = await conn.query(sql, [
			client.name,
			client.cpf,
			client.phone,
			client.email,
			client.address,
			client.client_id,
		]);

		return res.rows[0];
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

async function deleteClient(client_id) {
	const conn = await connect();
	try {
		const sql = `DELETE FROM clients where client_id = $1`;
		const res = await conn.query(sql, [client_id]);

		return res.rows;
	} catch (error) {
		throw error;
	} finally {
		conn.release();
	}
}

export default {
	insertClient,
	getClients,
	getClient,
	updateClient,
	deleteClient,
};
