require('../models/usuario-model');
const base = require('../bin/base/repository-base');
const md5 = require ('md5');

class usuarioRepository{
    
    constructor(){ 
        this._base = new base('Usuario'); 
        this._projection = 'nome email _id';
    }

    async isEmailExiste(email){
        return await this._base._model.findOne({email: email}, this._projection);
    }
    
    async authenticate(email, senha){
        let  _hashSenha = md5(senha);
        return await this._base._model.findOne({ email: email, senha: _hashSenha}, this._projection);
    }

    async create(data){ //AO INVES DE RETORNAR  USUARIO, DIRETO, PRIMEITRO PEGA ELE E DEPOIS RETORNA UMA PROJEÇÃO (nao exibe todos os dados)
        let usuarioCriado = await this._base.create(data);
        return await this._base._model.findById(usuarioCriado._id, this._projection);
    }

    async update(id, data){ //ALTERNA TUDO MENOS A SENHA
        let usuarioAtualizado = await this._base.update(id, 
            { 
                nome: data.nome,
                email: data.email,
                foto: data.foto
            });
        return await this._base._model.findById(usuarioAtualizado._id, this._projection);
    }

    async getAll(){ 
        return await this._base._model.find({}, this._projection); 
    }

    async getById(id){ 
        return await this._base._model.findById(id, 'nome email _id foto'); 
    }

    async delete(id){ 
        return await this._base.delete(id); 
    }
}

module.exports = usuarioRepository;