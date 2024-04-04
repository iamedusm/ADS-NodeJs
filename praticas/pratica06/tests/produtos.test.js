const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

describe("Testando rota de /produtos", () => {
    test("POST /produtos deve retornar status 201", async (req, res) => {
        const produtos = { nome: "uva", preco: 20.00 }
        const response = await request.post("/produtos").send(produtos)
        expect(response.status).toBe(201)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('nome', produtos.nome)
        expect(response.body).toHaveProperty('preco', produtos.preco)
    })

    test("GET /produtos deve retornar status 200", async (req, res) => {
        const response = await request.get("/produtos")
        expect(response.staus).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    test("GET /produtos/1 deve retornar status 200", async (req, res) => {
        const response = await request.get("/produtos/1")
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('nome')
        expect(response.body).toHaveProperty('preco')
    })

    test("GET /produtos/100 deve retornar status 404", async (req, res) => {
        const response = await request.get("/produtos/100")
        expect(response.status).toBe(404)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty('msg', "Produto não encontrado")
    })

    test("POST /produtos deve retornar status 422", async (req, res) => {
        const response = await request.post("/produtos")
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty("msg", "Nome e preço dos produtos são obrigatorios.")
    })

    test("PUT /produtos/100 deve retornar status 200", async (req, res) => {
        const produtos = { nome: "uva verde", preco: 18.00 }
        const response = await request.put("/produtos/1").send(produtos)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("nome", produtos.nome)
        expect(response.body).toHaveProperty("preco", produtos.preco)
    })

    test("PUT /produtos/100 deve retornar status 404", async (req, res) => {
        const response = await request.put("/produtos/100")
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("msg", "Produto não encontrado")
    })

    test("DELETE /produtos/1 deve retornar status 204", async (req, res) => {
        const response = await request.delete("/produtos/1")
        expect(response.status).toBe(204)
    })

    test("DELETE /produtos/100 deve retonar status 404", async (req, res) => {
        const response = await request.delete("/produtos/100")
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("msg", "Produto não encontrado")
    })
})