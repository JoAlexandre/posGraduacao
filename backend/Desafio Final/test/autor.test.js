import request from "supertest";
import app from "../src/index.js";
import Autor from "../models/autor.model.js";
import db from "../repository/db.js";
import Client from "../models/client.model.js";
import Venda from "../models/venda.model.js";
import Livro from "../models/livro.model.js";
const SECONDS = 1000

// aumentamos o timeout pois o db free da AIVEN não é tão rapido no inicio!
jest.setTimeout(70 * SECONDS)

describe("Teste das rotas do Autor", () => {
	beforeAll(async () => {
    await Autor.destroy({ where: {} });
    await Client.destroy({ where: {} });
    await Venda.destroy({ where: {} });
    await Livro.destroy({ where: {} });
	});

	// afterAll(async () => {
	// 	await db.close();
	// });

	const adminUser = {
		name: "admin",
		password: "desafio-igti-nodejs",
	};

	const payloadAutor = {
		nome: "Jose Alexandre",
		email: "jose.alexandre@email.com",
		telefone: "(99) 99999-9999",
  };
  let autorId = null

  
	let payloadLivro = {
    nome:"Laterals",
    valor: 499.99,
    estoque: 75,
  }

  let livroId = null

	let payloadCliente = {
    nome: "Isis Paula",
    email: "is_paula@gmail.com",
    senha: "0123",
    telefone: "(99) 99999-9999",
    endereco: "Av. Roraima, Q. 12 C.08, Paraiso Verde, Nova Mutum-MT, Brasil"
  }

  let clienteId = null

	
  let payloadVenda = {
    data: '2024-05-05'
  }

  let vendaId = null


  test('responser status 200 na raiz', async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200)
    
  })

	test("Criar um autor com dados de teste", async () => {
    const resp = await request(app)
      .post("/autor")
      .auth(adminUser.name, adminUser.password)
      .send(payloadAutor)

    const data = JSON.parse(resp.text)
    autorId = data.autorId
    expect(resp.status).toBe(200);
  });

  test('Verficar se o autor foi criado com corretamente no banco de dados', async() => {
    const resp = await request(app)
      .get(`/autor/${autorId}`)
      .auth(adminUser.name, adminUser.password)
    
    const data = JSON.parse(resp.text)
    expect(data.nome).toBe(payloadAutor.nome)
    expect(data.email).toBe(payloadAutor.email)
    expect(data.telefone).toBe(payloadAutor.telefone)
  })

  test('Criar um livro para o autor criado anteriormente', async() => {
    const resp = await request(app)
      .post(`/livro`)
      .auth(adminUser.name, adminUser.password)
      .send({ ...payloadLivro, autorId })
    
    const data = JSON.parse(resp.text)
    livroId = data.livroId
    
    expect(resp.status).toBe(200)
  })

  test('Verificar se o livro foi criado corretamente', async() => {
    const resp = await request(app)
      .get(`/livro/${livroId}`)
      .auth(adminUser.name, adminUser.password)
    
    const data = JSON.parse(resp.text)
    expect(payloadLivro.nome).toBe(data.nome)
    expect(payloadLivro.estoque).toBe(data.estoque)
    expect(payloadLivro.valor).toBe(data.valor)
  })

  test('Criar um cliente com dados de teste', async() => {
    const resp = await request(app)
      .post(`/cliente`)
      .auth(adminUser.name, adminUser.password)
      .send(payloadCliente)
    
    const data = JSON.parse(resp.text)
    clienteId = data.clientId
    
    expect(resp.status).toBe(200)
  })

  test('Verificar se o cliente foi criado corretamente', async() => {
    const resp = await request(app)
      .get(`/cliente/${clienteId}`)
      .auth(adminUser.name, adminUser.password)
    
    const data = JSON.parse(resp.text)
    expect(payloadCliente.nome).toBe(data.nome)
    expect(payloadCliente.email).toBe(data.email)
    expect(payloadCliente.endereco).toBe(data.endereco)
    expect(payloadCliente.telefone).toBe(data.telefone)
  })

  test("Buscar o livro criado utilizando os dados de login do usuario e verificar se o retorno é adequado", async () => {
    const resp = await request(app)
      .get(`/livro/${livroId}`)
      .auth(payloadCliente.email, payloadCliente.senha)
    
    const data = JSON.parse(resp.text)
    expect(payloadLivro.nome).toBe(data.nome)
    expect(payloadLivro.valor).toBe(data.valor)
  })

  test("Criar uma venda para o usuário e livro criados para teste", async () => {
    
    const resp = await request(app)
      .post('/venda')
      .auth(payloadCliente.email, payloadCliente.senha)
      .send({...payloadVenda, clientId: clienteId, livroId })
    
    expect(resp.status).toBe(200)
    
    const data = JSON.parse(resp.text)
    vendaId = data.vendaId
  })

  test("Verificar se a venda anterior foi salva corretamente", async () => {
    const resp = await request(app)
      .get(`/venda/${vendaId}`)
      .auth(payloadCliente.email, payloadCliente.senha)
      
    console.log(resp.text)
    const data = JSON.parse(resp.text)
    expect(data.clientId).toBe(clienteId)
    expect(data.livroId).toBe(livroId)
    
  })
});
