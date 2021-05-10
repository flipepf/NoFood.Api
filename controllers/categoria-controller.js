'use strict'

//require('../models/categoria-model');
//const mongoose = require('mongoose');
//const categoria = mongoose.model('Categoria'); //no Design Patter Repository Controller não precisa acessar o model
const repository = require('../repositories/categoria-repository');

const _repo = new repository();

function categoriaController(){}

categoriaController.prototype.post = async (req, res) => {
    //let modelo = new categoria(req.body);
    //let resultado = await modelo.save();
    let resultado = await new _repo().create(req.body);
    res.status(201).send(resultado);
};

categoriaController.prototype.put = async (req, res) => {
    //await categoria.findByIdAndUpdate(req.params.id, {$set: req.body});
    //let categoriaEncontrada = await categoria.findById(req.params.id);
    let categoriaEncontrada = await new _repo().update(req.params.id, req.body);
    res.status(202).send(categoriaEncontrada);
};

categoriaController.prototype.get = async (req, res) => {
    //let lista = await categoria.find();
    let lista = await new _repo().getAll();
    res.status(200).send(lista);
};

categoriaController.prototype.getById = async (req, res) => {
    //let categoriaEncontrada = await categoria.findById(req.params.id);
    let categoriaEncontrada = await new _repo().getById(req.params.id);
    res.status(200).send(categoriaEncontrada);
};

categoriaController.prototype.delete = async (req, res) => {
    //let deletado = await categoria.findByIdAndRemove(req.params.id);
    let deletado = await new _repo().delete(req.params.id);
    res.status(200).send(deletado);
};

module.exports = categoriaController;