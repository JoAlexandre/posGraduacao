import { promises as fs } from "fs";

init()
async function init() {
	try {
		const caminhoArquivo = "./teste3.txt";
		await fs.writeFile(caminhoArquivo, "bla bla bla");
		await fs.appendFile(caminhoArquivo, "\nteste appendFile");
		const data = await fs.readFile(caminhoArquivo, "utf8")
    console.log(data)
  } catch (error) {
    console.dir(error)    
  }
}
// const caminhoArquivo = './teste3.txt'
// fs.writeFile(caminhoArquivo, "bla bla bla")
// 	.then((response) => {
// 		console.log(response);
// 		fs.appendFile(caminhoArquivo, "\nteste appendFile")
// 			.then(() => {
// 				fs.readFile(caminhoArquivo, "utf8")
// 					.then((data) => console.log(data))
// 					.catch((err) => console.log(err));
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

/* UTILIZANDO CALLBACKS */
// const caminhoArquivo = "teste.txt";
// fs.writeFile(caminhoArquivo, conteudoArquivo, callback)
// // import fs from "fs";
// fs.writeFile(caminhoArquivo, "ola mundo", function (err) {
// 	if (err) {
// 		console.dir(err);
// 		return;
// 	}
// 	console.log("arquivo executado com sucesso");
// });

// // fs.appendFile(caminhoArquivo, conteudoArquivo, callback)
// fs.appendFile(caminhoArquivo, " \nteste de appendFile", function (err) {
// 	if (err) return console.dir(err);
// 	console.log("texto adicionado");
// });

// // fs.readFile(caminhoArquivo, options = {encoding, flag}, callback)
// fs.readFile(caminhoArquivo, "utf-8", function (err, data) {
// 	if (err) return console.dir(err);
// 	console.dir(data);
// });

// de forma assincrona, com interrupções no codigo
//- EVITAR

// const caminhoArquivoSync = "teste2.txt";

// console.log('\n\n\n\n');
// console.log("1");
// fs.writeFileSync(caminhoArquivoSync, "teste assincrono");
// console.log(2);
// const data = fs.readFileSync(caminhoArquivoSync, 'utf-8')
// console.log(data)
// console.log(3)
