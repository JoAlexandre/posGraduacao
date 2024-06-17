import { promises as fs } from "fs";

//leitura e escrita com conteudo json
// utilizando promises
writeReadJson();

async function writeJson(caminho, data) {
	try {
		await fs.writeFile(caminho, JSON.stringify(data, null, 2));
	} catch (error) {
		console.log(error);
	}
}

async function writeReadJson() {
	try {
		//data a ser escrita
		const carros = ["GOL", "PALIO", "UNO"];
		const obj = {
			carros: carros,
		};
		//escrita da variavel
		await writeJson("teste.json", obj);
		//leitura dos dados
		let data = JSON.parse(await fs.readFile("teste.json", "utf-8"));
		//alteração dos dados
		data.carros.push("SANDERO");
		console.log(data);
		//reescrita dos dados
		await writeJson("teste.json", data);
	} catch (error) {
		console.dir(error);
	}
}
