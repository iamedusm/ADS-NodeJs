const supertest = require('supertest')

const app = require('../app')

const request = supertest(app)

describe('Teste API Produtos', () => {
    const dadosProdutos = { nome: "Produto 1", preco: "5.00" }

    test("POST / deve retornar 201 um array JSON", async () => {
        const respose = request.post('/')
    })

    test("POST / deve retornar 422 um objeto JSON", async () => {
        const respose = request.post('/')
    })

    test("GET / deve retornar 200 um array JSON", async () => {
        const respose = request.get('/')
    })

    test("GET /id deve retornar 200 e um objeto JSON", async () => {
        const respose = request.get('/')
    })

    test("GET /id deve retornar 404 e um objeto JSON", async () => {
        const respose = request.get('/')
    })

    test("PUT /id deve retornar 200 e um objeto JSON", async () => {
        const respose = request.put('/')
    })

    test("PUT /id deve retornar 422 e um objeto JSON", async () => {
        const respose = request.put('/')
    })

    test("PUT /id deve retornar 404 e um objeto JSON", async () => {
        const respose = request.put('/')
    })

    test("DELETE /id deve retornar 204 sem um body", async () => {
        const respose = request.delete('/')
    })

    test("DELETE /id deve retornar 404 e um objeto JSON", async () => {
        const respose = request.delete('/')
    })
})