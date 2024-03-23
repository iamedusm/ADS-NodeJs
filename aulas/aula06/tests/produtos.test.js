const supertest = require('supertest')

const app = require('../app')

const request = supertest(app)

describe('Teste API Produtos', () => {

    test("POST / deve retornar 201 um array JSON", async () => {
        const novo = { nome: "Produto 1", preco: "5.00" }
        const response = await request.post('/produtos').send(novo)
        expect(response.status).toBe(201)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty("nome", novo.nome)
        expect(response.body).toHaveProperty('preco', novo.preco)
    })

    test("POST / deve retornar 422 um objeto JSON", async () => {
        const novo = { nome: "Produto 1", preco: "5.00" }
        const response = await request.post('/produtos')
        expect(response.status).toBe(422)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty("msg", "Dados invalidos.")
    })

    test("GET / deve retornar 200 um array JSON", async () => {
        const response = await request.get('/produtos')
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(Array.isArray(response.body)).toBe(true)
    })

    test("GET /id deve retornar 200 e um objeto JSON", async () => {
        const response = await request.get('/produtos/1')
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('nome')
        expect(response.body).toHaveProperty('preco')
    })

    test("GET /id deve retornar 404 e um objeto JSON", async () => {
        const response = await request.get('/produtos/2')
        expect(response.status).toBe(404)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty('msg', "Produto não encontrado")
    })

    test("PUT /id deve retornar 200 e um objeto JSON", async () => {
        const editar = { nome: "Produto 1", preco: "5.00" }
        const response = await request.put('/produtos/1').send(editar)
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty('id')
    })

    test("PUT /id deve retornar 422 e um objeto JSON", async () => {
        const response = await request.put('/produtos/1')
        expect(response.status).toBe(422)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty('msg', "Dados invalidos.")
    })

    test("PUT /id deve retornar 404 e um objeto JSON", async () => {
        const response = await request.put('/produtos/2')
        expect(response.status).toBe(404)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty('msg', "Produto não encontrado")
    })

    test("DELETE /id deve retornar 204 sem um body", async () => {
        const response = await request.delete('/produtos/1')
        expect(response.status).toBe(204)
    })

    test("DELETE /id deve retornar 404 e um objeto JSON", async () => {
        const response = await request.delete('/produtos/2')
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('msg', "Produto não encontrado")
    })
})