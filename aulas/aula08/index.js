const { MongoClient, ObjectId } = require('mongodb')

const url = "mongodb+srv://iamedusm:rwbmHfdhFiWR6uC4@cluster0.xlhoqft.mongodb.net/"

async function conectar() {
    try {
        const mongoClient = await MongoClient.connect(url)
        return (await mongoClient).db("loja")
    } catch(e) {
        console.log(`Erro: ${e}`)
    }
}


async function buscarProdutos() {
    const db = await conectar()
    return await db.collection("produtos").find({}).toArray()
}

async function buscaProduto(_id) {
    const db = await conectar()
    return await db.collection("produtos").findOne(_id)
}

async function inserir(produto) {
    const db = await conectar()
    return db.collection("produtos").insertOne(produto)
}

async function remover(_id) {
    const db = await conectar()
    return db.collection("produtos").deleteOne({ _id: new ObjectId(_id) })
}

async function atualizar(_id, produtoAtualizado) {
    const db = await conectar()
    return db.collection("produtos").updateOne(
        { _id: new ObjectId(_id) },
         {$set: produtoAtualizado}
    )
}

async function testar() {
    // const result = await inserir({nome: "banana", preco: 20.00})
    const result = await buscarProdutos()
    console.log(result, '\n\n')
    const produto = {nome: "banana", preco: 15.00}
    const update = await atualizar("66284ce990f3e2150e2613e3", produto)
    console.log(update)

    const result1 = await buscarProdutos()
    console.log(result1, '\n\n')

    // result.forEach( (r) => {
    //     console.log(r)
    // } )
}

testar()