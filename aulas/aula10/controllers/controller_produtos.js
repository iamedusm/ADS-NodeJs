const mongoose = require('mongoose')
const Produto = require('../models/model_produtos');

async function validarDados(req, res, next) {
    const produto = new Produto(req.body);
    try {
        await produto.validate();
        next();
    } catch (err) {
        res.status(422).json({ msg: 'Dados do produto invalidos' });
    }
}

async function criar(req, res) {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
}

async function obterTodos(req, res) {
    const produtos = await Produto.find({});
    res.json(produtos);
}

async function obter(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const produto = await Produto.findOne({ _id: id })
    res.json({produto})
}

module.exports = { validarDados, criar, obterTodos, obter };