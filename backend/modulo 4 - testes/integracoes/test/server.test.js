const supertest = require('supertest')
const request = supertest('http://localhost:8090')

describe("Testes de Integrações", () => {
  test('Servidor na porta 8090', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })
  test('Servidor na porta 8090', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })

  test('Servidor na porta 8090', async () => {
    const soma = (a, b) => a + b
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })
  
  test('Servidor na porta 8090', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })
  
  test('Servidor na porta 8090', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })
  
  test('Servidor na porta 8090', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })
  
  test('Servidor na porta 8090', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })
  
  test('Servidor na porta 8090', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })
  
  test('Servidor na porta 8090', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })
  

})