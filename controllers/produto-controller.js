'use strict'

const repository = require('../repositories/produto-repository');

const _repo = new repository();

function produtoController(){}

produtoController.prototype.post = async (req, res) => {
    let resultado = await new _repo().create(req.body);
    res.status(201).send(resultado);
};

produtoController.prototype.put = async (req, res) => {
    let resultado = await new _repo().update(req.params.id, req.body);
    res.status(202).send(resultado);
};

produtoController.prototype.get = async (req, res) => {
    let lista = await new _repo().getAll();
    res.status(200).send(lista);
};

produtoController.prototype.getById = async (req, res) => {
    let resultado = await new _repo().getById(req.params.id);
    res.status(200).send(resultado);
};

produtoController.prototype.delete = async (req, res) => {
    let deletado = await new _repo().delete(req.params.id);
    res.status(200).send(deletado);
};

module.exports = produtoController;