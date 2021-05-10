const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');
const categoriaRouter = require('../routes/categoria-router');
const produtoRouter = require('../routes/produto-router');

//CRIANDO/INVOCANDO A API/SERVER WEB DO EXPRESS
const app = express();

//CONFIGURAÇÃO DE PARSE DO JSON
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

//CONFIGURANDO CONEXÃO COM BD
mongoose.connect(variables.Database.connection);

//CONFIGURANDO AS ROTAS
app.use('/api/categoria', categoriaRouter)
app.use('/api/produto', categoriaRouter)

//EXPORTANTO A API
module.exports = app;