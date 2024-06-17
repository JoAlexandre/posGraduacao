/* eslint-env jest */

const calculaValor = require("../src/calculaValor.js");
const mockFunctions = require('../src/mock.js')

require('./extensoes.js')

describe("Calcular Montante", () => {
	test("Com uma prestação montante é igual ao capital", () => {
		// Operação -> runner
		const montante = calculaValor.calcularMontante(100, 0.0175, 1);

		// Comportamento esperado
		expect(montante).toBe(100);
	});

	test("Capital de R$ 500,00 e com 3 PRESTAÇÕES, montante é igual a R$ 538,45", () => {
		// Operação -> runner
		const montante = calculaValor.calcularMontante(500, 0.025, 3);

		// Comportamento esperado
		expect(montante).toBe(538.45);
	});

	test("Capital de R$ 1000,00 e com 6 PRESTAÇÕES, o montante é igual a R$ 1159,69", () => {
		//operacao
		const montante = calculaValor.calcularMontante(1000, 0.025, 6);

		expect(montante).toBe(1159.69);
	});

	test("Capital de R$ 750,00 e com 9 PRESTAÇÕES, o montante é igual a R$ 936,65", () => {
		const montant = calculaValor.calcularMontante(750, 0.025, 9);

		expect(montant).toBe(936.65); // tem que ser igual ao valor informado
		// expect(montant).toBeCloseTo(936.65) // espera ser proximo ao valor informado
	});
});

describe("Arredondar", () => {
	test("Arredondar em duas casas decimais", () => {
		const resultado = calculaValor.arredondar(538.445312499998);

		expect(resultado).toBe(538.45);
  });  
  
  test('1.005 deve retornar 1.01', () => {
    const resultado = calculaValor.arredondar(1.005)

    expect(resultado).toBe(1.01)
  })
});

describe("Calcular Prestações", () => {
	
	test('O numero de parcelas é igual ao numero de prestacoes', () => {
		const numeroPrestacoes = 6
		const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes)

		expect(prestacoes.length).toBe(numeroPrestacoes)
	})

	test('Uma unica parcela, o valor é igual ao montante', () => {
		const parcelas = 1

		const prestacoes = calculaValor.calcularPrestacoes(100, parcelas)

		expect(prestacoes).toStrictEqual([100])
	})

	test('Com duas parcelas, o valor é igual a metade do montante', () => {
		// Premissas
		const numeroPrestacoes = 2
		const montante = 100

		// Operação
		const pretacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)

		// Valor Esperado
		expect(pretacoes[0]).toBe(50)
		expect(pretacoes[1]).toBe(50)
		expect(pretacoes.reduce((p, c) => p + c, 0)).toBe(montante)
	})

	test("Capital de R$ 100 e com 3 Parcelas, o valor a ser retornado é [R$ 33.34, R$ 33.33, R$ 33.33]", () => {
		// Premissas
		const numeroPrestacoes = 3
		const montante = 100

		// Operação
		const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)
		
		// Resutado Esperado
		expect(prestacoes.reduce((p, c) => p + c, 0)).toBe(montante)
	
	})
	test("Capital de R$ 59 e com 3 Parcelas, o valor a ser retornado é [R$ 33.34, R$ 33.33, R$ 33.33]", () => {
		// Premissas
		const numeroPrestacoes = 3
		const montante = 59
		// Operação
		const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)
		
		const soma = calculaValor.arredondar(prestacoes.reduce((p, c) => p + c, 0))
		expect(soma).toBe(montante)
	
		expect([...prestacoes]).not.prestacoesSejaDecrescente()

	})

	test('Desafio semi-final', () => {
		// Given
		const numeroPrestacoes = 3
		const montate = 101.994

		// When
		const prestacoes = calculaValor.calcularPrestacoes(montate, numeroPrestacoes)

		// const soma = calculaValor.arredondar(prestacoes.reduce((p, c) => p + c, 0))
		// expect(soma).toBe(calculaValor.arredondar(montate))

		expect(prestacoes).tenhaSomaDeValoresIgual(montate )

	})


})

describe("Testes com arrays", () => {
	test('Verifica se a Array contem alguns nomes', () => {
		const arr = ['josé', 'joão', 'pedro', 'patricia', 'pamela', 'isis']
		expect(arr).toContain('joão')
	})
})


describe("Exemplos de Mock", () => {
	//Mock é utilizado para simular funções de saida do sistema, comunicação com o banco, respostas esperadas de apis ...
	// ou seja, é uma função mocada de simulação da resposta esperada

	test.only("Exemplo 1 - Mock Callback", () => {
		let pessoas = new Array(3)

		pessoas[0] = { name:'João', idade: 19 }
		pessoas[1] = { name:'José', idade: 27 }
		pessoas[2] = { name:'Isis', idade: 26 }
		pessoas[3] = { name: 'Gabriela', idade: 12 }
		
		//cria a função de callback
		const mockCallback = jest.fn(p => p.idade)

		//realizar execução
		mockFunctions.somenteAdultos(pessoas, mockCallback)
		
		//verifica as assertions
		expect(mockCallback.mock.calls.length).toBe(3)
	})
	test.only("Exemplo 2 - Mock Times", (done) => {
		jest.useFakeTimers()

		const mockCallback = jest.fn(() => done())

		mockFunctions.aguardarTimer(mockCallback)

		jest.advanceTimersByTime(1000)		
		expect(mockCallback).toHaveBeenCalledTimes(0)
		
		jest.advanceTimersByTime(2000)		
		expect(mockCallback).toHaveBeenCalledTimes(1)
	})
})

//montagem e desmontagem de cenario
/**
 * beforAll
 * beforeEach
 * afterAll
 * afterEach
 */

afterEach(() => {
	jest.useRealTimers()
})