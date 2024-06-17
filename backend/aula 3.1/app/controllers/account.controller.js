/**
 * Controllers[
 *
 * FUNCIONALIDADES
 * Receber as requisições
 * Validação de dados (entrada)
 *
 * NÃO SERVEM PARA
 * Persistir dados
 * Regras de negócio
 */

import AccountServices from "../services/account.service.js";

const createAccount = async (req, res, next) => {
	try {
		let account = req.body;

		if (!account.name || account.balance == null) {
			throw new Error("Name e Balance são obrigatórios.");
    }
    
    account = await AccountServices.createAccount(account)
    
    res.send(account);
    
		logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(account)}`);
	} catch (error) {
		next(error);
	}
};

const getAccounts = async (req, res, next) => {
	try {
		let accounts = await AccountServices.getAccounts() 
		res.send(accounts);
		logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
	} catch (error) {
		next(error);
	}
};

const getAccountByID = async (req, res, next) => {
	try {
		let account = await AccountServices.getAccountsByID(req.params.id)

		if (!account) {
			throw new Error("Usuario nao encontrado");
		}

		res.send(account);
		logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(account)}`);
	} catch (error) {
		next(error);
	}
};

const deleteAccounts = async (req, res, next) => {
	try {
		await AccountServices.deleteAccounts(req.params.id)
		res.end();
		logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${req.params.id}`);
	} catch (error) {
		next(error);
	}
};

const updateAccounts = async (req, res, next) => {
	try {
		let account = req.body;
    account =  await AccountServices.updateAccounts(account)
		
		res.send(account);
		logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(account)}`);
	} catch (error) {
		next(error);
	}
};

const updateBalance = async (req, res, next) => {
	try {
    let account = req.body;
    if (!account.id || account.balance == null) {
			throw new Error("ID e Balance são obrigatórios.");
    }
    
    account = await AccountServices.updateBalance(account)
		res.send(account);
		logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(account)}`
		);
	} catch (error) {
		next(error);
	}
};

export default {
	createAccount,
	getAccounts,
	getAccountByID,
	updateAccounts,
	deleteAccounts,
	updateBalance,
};
