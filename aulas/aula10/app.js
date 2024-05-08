require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

mongoose.connect(process.env.MONGODB_URL)

const routerProdutos = require('./routes/router_produtos')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/produtos', routerProdutos)

module.exports = app;