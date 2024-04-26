const { MongoClient } = require('mongodb')

const url = "mongodb+srv://iamedusm:rwbmHfdhFiWR6uC4@cluster0.xlhoqft.mongodb.net/"

async function conectarDB() {
    try {
        const client = await MongoClient.connect(url)
        return (await client).db("agenda")
    } catch (e) {
        console.log(`Erro ao conectar com o banco de dado: ${e}`)
    }
}

module.exports = { conectarDB }