const supertest = require('supertest');

const controllerProdutos = require('../controllers/controller_produtos');

const app = require('../app');

const request = supertest(app);

let id = null;

describe('API Loja Virtual', () => {
    //test('Deve retornar 201 e um JSON no POST /produtos', async () => {
    //const response = await request.post('/produtos').send({ nome: "maminha", preco: 30.0 });
    //expect(response.status).toBe(201);
    //expect(response.type).toBe('application/json');
    //id = response.body._id;
    //});

    test('Deve retornar 422 e um JSON? no POST /produtos', async () => {
        const response = await request.post("/produtos").send({});
        expect(response.status).toBe(422);
        expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e um array no GET /produtos", async () => {
        const response = await request.get("/produtos");
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        if (response.body.length > 0) {
            id = response.body[0]._id.toString();
        }
    });

    test("Deve retornar 200 e um JSON no GET /produtos/id", async () => {
        const response = await request.get(`/produtos/${id}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body.produto).toHaveProperty('nome')
        expect(response.body.produto).toHaveProperty('preco')
        expect(response.body.produto).toHaveProperty('quantidade')
    });
});