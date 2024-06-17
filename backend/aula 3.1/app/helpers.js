import { promises as fs, readFile } from "fs";
const months = [
	"janeiro",
	"fevereiro",
	"marco",
	"abril",
	"maio",
	"junho",
	"julho",
	"agosto",
	"setembro",
	"outubro",
	"novembro",
	"dezembro",
];

function automatePath(path = "") {
	const data = new Date();
	return `./logs/${data.getFullYear()}/${
		months[data.getMonth()]
	}/${data.getDate()}/${path}`;
}

async function readJson(path) {
	try {
		const data = await fs.readFile(path, "utf-8");
		return JSON.parse(data);
	} catch (error) {
		throw error
	}
}


async function writeOnJson(path, obj) {
	try {
		await fs.writeFile(path, JSON.stringify(obj, null, 2));
	} catch (error) {
		console.log(error, 'oi');
  }
	
} 

async function readJsonWithParams(dia, mes, ano) {

	const dir = `../logs/${ano}/${months[Number(mes) - 1]}/${dia}/logs.json`;
	try {
		const data = await fs.readFile(dir, "utf-8");
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
}
export { readJson, writeOnJson, readJsonWithParams };
