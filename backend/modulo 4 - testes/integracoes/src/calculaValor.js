function calcularPrestacoes(capital, parcelas) {
	const prestacaoBase = arredondar(capital / parcelas);
	const resultado = new Array(parcelas).fill(prestacaoBase);

	let somaPrestacao = resultado.reduce((p, c) => p + c, 0)
	let diferenca = capital - somaPrestacao
	const fator  = diferenca > 0 ? 1 : -1
	let i  = diferenca > 0 ? 0 : resultado.length - 1

	while (diferenca !== 0) {
		resultado[i] = arredondar(resultado[i] + (0.01 * fator))
		somaPrestacao = resultado.reduce((p, c) => p + c, 0)
		diferenca = arredondar(capital - somaPrestacao)
		i += fator
	}
	return resultado

	// if (ArrayR.reduce((p, c) => p + c, 0) === capital) {
	// 	return ArrayR
	// } else {
	// 	return [
	// 		... new Array(parcelas - 1).fill(resultado),
	// 		arredondar(resultado + (diferenca)),
	// 	]
	// }
}

function calcularMontante(capital, taxa, periodo) {
	let montante = 0;
	if (periodo > 1) {
		montante = capital * Math.pow(1 + taxa, periodo);
	} else {
		montante = capital * Math.pow(1 + taxa, periodo - 1);
	}

	return arredondar(montante);
}

function arredondar(valor) {
	const precisao = 100;
	return Math.round((valor + Number.EPSILON) * precisao) / precisao;
}

module.exports = {
	calcularMontante,
	arredondar,
	calcularPrestacoes,
};
