const calculaValor = require('../src/calculaValor.js')

expect.extend({
  tenhaSomaDeValoresIgual(arr, soma) {
    const somaReal = calculaValor.arredondar(arr.reduce((p, c) => p + c, 0))

    return {
      message: () => `A soma dos valores ${JSON.stringify(arr)}: ${somaReal} deve ser igual a ${soma}`,
      pass: somaReal === calculaValor.arredondar(soma)
    }
  },
  prestacoesSejaDecrescente(prestacoes) {
    for (let i = 0; i < prestacoes.length - 1; i++) {
      const j = 1 + i
      if (prestacoes[i] < prestacoes[j]) {
        return {
          message: () => `Lista de prestações  ${JSON.stringify(prestacoes)} deve estar em ordem decrescente`,
          pass: false
        }
      }
    }
    return {
      message: () => `Lista de prestações  ${JSON.stringify(prestacoes)} deve estar em ordem decrescente`,
      pass: true
    }
  }

})