const { conectarDB } = require('./database')

class Contato {
    constructor(nome, email, telefone) {
        this.collection = "contatos"
        this.id = null
        this.nome = nome
        this.email = email
        this.telefone = telefone
    }

    async inserir(contato) {
        try {
            const db = await conectarDB()
            const result = await db.collection(this.collection).insertOne(contato)
            result.insertedId = contato.id
            return contato
        } catch (e) {
            console.log(`Erro ao inserir contato: ${e}`)
        }
    }

    async alterar(contato) {
        try {
            const db = await conectarDB()
            return await db.collection(this.collection).updateOne(
                { _id: contato.id },
                { $set: contato })
        } catch (e) {
            console.log(`Erro ao alterar contato: ${e}`)
        }
    }

    async deletar(contato) {
        try {
            const db = await conectarDB()
            return await db.collection(this.collection).deleteOne(contato)
        } catch (e) {
            console.log(`Erro ao deletar contato: ${e}`)
        }
    }

    async buscar(contato) {
        try {
            const db = await conectarDB()
            const collection = db.collection(this.collection)
            const result = await collection.findOne(contato)
            this.nome = result.nome
            this.email = result.email
            this.telefone = result.telefone
            return result
        } catch (e) {
            console.log(`Erro ao buscar contato: ${e}`)
        }
    }


}

const contato = new Contato("teste", "teste@teste.com", "5454545")
contato.inserir({ nome: "teste", email: "teste@teste.com", telefone: "5454545" })
