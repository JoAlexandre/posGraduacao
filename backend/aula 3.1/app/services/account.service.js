
import AccountRepository from "../repositories/account.repositories.js";

async function createAccount(account) {
	return await AccountRepository.insertAccount(account);
}

async function getAccounts() {
	return await AccountRepository.getAccounts();
}

async function getAccountsByID(id) {
	return await AccountRepository.getAccountByID(id);
}

async function deleteAccounts(id) {
	return await AccountRepository.deleteAccounts(id);
}

async function updateAccounts(account) {
	return AccountRepository.updateAccount(account);
}

async function updateBalance(account) {
	const acc = await AccountRepository.getAccountByID(account.id);
	acc.balance = account.balance;

	return await AccountRepository.updateAccount(acc);
}

export default {
	createAccount,
	getAccounts,
	getAccountsByID,
	deleteAccounts,
	updateAccounts,
	updateBalance,
};
