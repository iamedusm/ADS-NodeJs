require('dotenv').config()
const mongoose = require('mongoose')
const Produto = require('./modelo')

const url = process.env.MONGODB_URL

async function main() {
    try {
        await mongoose.connect(url)
        console.log(`MongoDB conectado.`)
    } catch (e) {
        console.log(`Deu erro: ${e.message}`)
    }

    const dadosProduto = { nome: "banana", preco: 12, quantidade: 5 }

    // INSERIR METODO 1
    // const produto = new Produto(dadosProduto)
    // await produto.save()

    // INSERIR METODO 2
    // const produto = await Produto.create(dadosProduto)

    // INSERIR VARIOS PRODUTOS
    // const produto = await Produto.insertMany(
    //     [
    //         { nome: "uva", preco: 12, quantidade: 5 },
    //         { nome: "pera", preco: 12, quantidade: 5 },
    //         { nome: "melancia", preco: 12, quantidade: 5 },
    //         { nome: "abacaxi", preco: 12, quantidade: 5 },
    //         { nome: "laranja", preco: 12, quantidade: 5 },
    //         { nome: "manga", preco: 12, quantidade: 5 },
    //         { nome: "abacate", preco: 12, quantidade: 5 },
    //         { nome: "kiwi", preco: 12, quantidade: 5 },
    //     ]
    // );


    // CONSULTAR UM PRODUTO
    // const produto = await Produto.findOne({nome: "bananaasdsd"})

    // CONSULTAR VARIOS PRODUTOS COM O NOME
    const produto = await Produto.find({nome: "banana"})

    console.log(produto)

    await mongoose.disconnect()
}

main()