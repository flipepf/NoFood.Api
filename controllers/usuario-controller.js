'use strict'

const repository = require('../repositories/usuario-repository');
const ctrlBase = require ('../bin/base/controller-base');
const validation = require ('../bin/helpers/validation');
const variables = require ('../bin/configuration/variables');
const md5 = require ('md5');
const jwt = require('jsonwebtoken');

const _repo = new repository();

function usuarioController(){}

usuarioController.prototype.post = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, "Informe seu nome.");
    _validationContract.isRequired(req.body.email, "Informe seu e-mail.");
    _validationContract.isEmail(req.body.email, "O e-mail informado é inválido.");
    _validationContract.isRequired(req.body.senha, "A senha é obrigatória.");
    _validationContract.isRequired(req.body.senhaConfirmacao, "A confirmação da senha é obrigatória.");
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, "A senha e a confirmação da senha não são iguais.");
    
    let usuarioIsEmailxiste = await _repo.isEmailExiste(req.body.email);
    if (usuarioIsEmailxiste){
        _validationContract.isTrue((usuarioIsEmailxiste.nome != undefined),`E-mail ${req.body.email} já cadastrado em nosa base de dados.`);
    }

    req.body.senha = md5(req.body.senha);
    
    ctrlBase.post(_repo, _validationContract, req, res);
};

usuarioController.prototype.put = async (req, res) => {
    let _validationContract = new validation();
    //let data = req.body;
    _validationContract.isRequired(req.body.nome, "Informe seu nome.");
    _validationContract.isRequired(req.body.email, "Informe seu e-mail.");
    _validationContract.isEmail(req.body.email, "O e-mail informado é inválido.");
    _validationContract.isRequired(req.params.id, "Informe ID do usuário a ser editado.");

    let usuarioIsEmailxiste = await _repo.isEmailExiste(req.body.email);
    if (usuarioIsEmailxiste){
        _validationContract.isTrue(
            (usuarioIsEmailxiste.nome != undefined) &&
            (usuarioIsEmailxiste._id != req.params.id),
            `E-mail ${req.body.email} já cadastrado em nosa base de dados.`);
    }
    
    ctrlBase.put(_repo, _validationContract, req, res);
};

usuarioController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
};

usuarioController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};

usuarioController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};

usuarioController.prototype.autenticar = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.email, "Informe seu email.");
    _validationContract.isEmail(req.body.email, "O e-mail informado é inválido.");
    _validationContract.isRequired(req.body.senha, "Informe sua senha.");

    if (!_validationContract.isValid()){
        res.status(400).send({
            message: 'Não foi ṕossivel efetuar o login.',
            validation: _validationContract.errors()
        });
        return;
    }
    let resultado = await _repo.authenticate(req.body.email, req.body.senha);
    if (resultado){
        res.status(200).send({
            usuario: resultado,
            token: jwt.sign({ user: resultado }, variables.Security.secretKey)
        });
    } else {
        res.status(404).send({
            message: 'Usuário e senha inválidos.'
        });
    }
};

module.exports = usuarioController;