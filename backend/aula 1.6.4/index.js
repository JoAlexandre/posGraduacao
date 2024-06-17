/**
 *		evento de readline do nodejs
 * 		comando usado para ler e escrever os dados no prompt de comando
 *   */

import readline from "readline";
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function multiplos(valor) {
	const returnMulti = [];
	for (let i = 0; i < parseInt(valor) + 1; i++) {
		if (i % 3 == 0 || i % 5 == 0) returnMulti.push(i);
	}
	return returnMulti.filter(i => i !== 0);
}

pergunta();
function pergunta() {
	rl.question("Digite um numero: ", function (answer) {
		if (answer == -1) return rl.close();

		console.log("Numero digitado: " + answer + "\n");
		console.log(
			"Os multiplos de 5 e 3 para o numero digitado são: " +
				multiplos(answer) +
				"\n"
		);

		pergunta();
	});
}
