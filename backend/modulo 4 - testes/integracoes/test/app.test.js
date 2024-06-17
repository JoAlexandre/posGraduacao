const request = require("supertest");
const db = require("../src/repository/db.js");

const app = require("../src/app.js");
const Clients = require("../src/models/clients.model.js");
const Consulta = require("../src/models/consulta.model.js");

describe("Teste de Integração", () => {
	beforeEach(async () => {
		await Clients.destroy({ where: {} });
		await Consulta.destroy({ where: {} });
	});

	afterAll(async () => {
		await db.close();
	});

	const clientJoao = {
		nome: "João",
		cpf: "000.000.000-00",
	};

	const payloadRequest = {
		...clientJoao,
		valor: 101.75,
		qtde_prestacoes: 3,
	};

	const resultadoEsperado = {
		montante: 109.57,
		juros: 0.025,
		qtde_prestacoes: 3,
		prestacoes: "[36.53,36.52,36.52]",
	};

	test("Responder statusCode 200 na raiz", async () => {
		const data = await request(app).get("/");
		expect(data.status).toBe(200);
	});

  test("Cenário 1: Criar consulta/cliente caso consulta e cliente não existam", async () => {
    const res = await request(app).post('/consulta').send(payloadRequest)
    
    //verifica se a consulta foi gerada com sucesso
    expect(res.status).toBe(200)

    //verifica se o cliente foi criado
    const client = await Clients.findByPk(payloadRequest.cpf, {raw: true, attributes:['nome','cpf'] })
    expect(client).toMatchObject(clientJoao)

    //verifica se a consulta foi armazenada
    const consulta = await Consulta.findOne({ where: { client_cpf: clientJoao.cpf } })
    
    expect(consulta.valor).toBe(101.75)

  })
	test("Cenário 2", async () => {
		const res = await request(app).post("/consulta").send(payloadRequest);
		expect(res.body).toMatchSnapshot(resultadoEsperado);
	});

	test("Cenário 3", async () => {
		const res = await request(app).post("/consulta").send(payloadRequest);
		// expect(res.body).toMatchSnapshot(resultadoEsperado)

		const res1 = await request(app).post("/consulta").send(payloadRequest);
		expect(res1.status).toBe(400);
	});
});
