const supertest = require("supertest")
const request = supertest(`http://localhost:3002`)

describe("Teste do Servidor", () => {

  test('Servidor na porta 3000', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
    expect(resp.text).toBe('hello world')
  })

})