import { promises as fs } from "fs";

const { writeFile, readFile } = fs;
const fileName = "accounts.json";

async function getAccounts() {
	const data = await JSON.parse(await readFile(fileName));
	return data.accounts;
}

async function insertAccount(account) {
	const data = await JSON.parse(await readFile(fileName));

	account = {
		id: data.nextId,
		name: account.name,
		balance: account.balance,
	};

	data.nextId++;
	data.accounts.push(account);
	await writeFile("accounts.json", JSON.stringify(data, null, 2));

	return account;
}

async function getAccountByID(id) {
	const accounts = await getAccounts();
  const account = accounts.find((item) => item.id === parseInt(id));
  if (account) {
    return account;
  }
  throw new Error('Registro não encontrado')
}

async function deleteAccounts(id) {
  let accounts = JSON.parse(await readFile(fileName));
  console.log(accounts)

	accounts.accounts = accounts.accounts.filter(
		(item) => item.id !== parseInt(id)
	);

  await writeFile("accounts.json", JSON.stringify(accounts, null, 2));
}

async function updateAccount(account) {
  let data = JSON.parse(await readFile(fileName));

	const indexAccount = data.accounts.findIndex(
		(item) => item.id === parseInt(account.id)
	);

	if (indexAccount < 0) {
		throw new Error("Usuario nao encontrado");
	}

	data.accounts[indexAccount] = {
		id: account.id,
		name: account.name,
		balance: account.balance,
	};

  await writeFile("accounts.json", JSON.stringify(data, null, 2));
  return data.accounts[indexAccount]
}

export default {
	getAccounts,
	insertAccount,
  getAccountByID,
  deleteAccounts,
  updateAccount
};
