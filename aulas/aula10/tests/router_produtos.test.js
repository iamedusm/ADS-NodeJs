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
    });

    test("Deve retornar 404 e um JSON no GET /produto/id", async () => {
        const response = await request.get("/produtos/6628518ffa69592ab3c3e2c2");
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
    })

    test("Deve retornar 200 e um JSON no PUT /produtos/id", async () => {
        const response = await request.put(`/produtos/${id}`)
            .send({ nome: "Cupim", preco: 55 });
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
    });
    
    test("Deve retornar 404 e um JSON no PUT /produto/id", async () => {
        const response = await request.put("/produtos/6628518ffa69592ab3c3e2c1");
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
    })

    test('Deve retornar 422 e um JSON? no PUT /produtos', async () => {
        const response = await request.put(`/produtos/${id}`).send({});
        expect(response.status).toBe(422);
        expect(response.type).toBe("application/json");
    });

});

