'use strict'

require('../models/categoria-model');
//const mongoose = require('mongoose');
//const categoria = mongoose.model('Categoria'); //no Design Patter Repository Controller não precisa acessar o model

const repository = require('../repositories/categoria-repository');

function categoriaController(){}

categoriaController.prototype.post = async (req, res) => {
    //let modelo = new categoria(req.body);
    //let resultado = await modelo.save();
    let resultado = await new repository().create(req.body);
    res.status(201).send(resultado);
};

categoriaController.prototype.put = async (req, res) => {
    //await categoria.findByIdAndUpdate(req.params.id, {$set: req.body});
    //let categoriaEncontrada = await categoria.findById(req.params.id);
    let categoriaEncontrada = await new repository().update(req.params.id, req.body);
    res.status(202).send(categoriaEncontrada);
};

categoriaController.prototype.get = async (req, res) => {
    //let lista = await categoria.find();
    let lista = await new repository().getAll();
    res.status(200).send(lista);
};

categoriaController.prototype.getById = async (req, res) => {
    //let categoriaEncontrada = await categoria.findById(req.params.id);
    let categoriaEncontrada = await new repository().getById(req.params.id);
    res.status(200).send(categoriaEncontrada);
};

categoriaController.prototype.delete = async (req, res) => {
    //let deletado = await categoria.findByIdAndRemove(req.params.id);
    let deletado = await new repository().delete(req.params.id);
    res.status(200).send(deletado);
};

module.exports = categoriaController;