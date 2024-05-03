const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    quantidade: Number,
})

module.exports = mongoose.model('Produto', produtoSchema)