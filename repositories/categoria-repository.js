require('../models/categoria-model');
const mongoose = require('mongoose');
const categoriaModel = mongoose.model('Categoria');

//Não mais por function (método antes realizado no model), mas por class 
class categoriaRepository{
    constructor(){}

    async create(data){
        let categoria = new categoriaModel(data);
        //let resultado = await categoria.save();
        //return resultado;
        return await categoria.save();
    }

    async update(id, data){
        await categoriaModel.findByIdAndUpdate(id, {$set: data});
        //let resultado = await categoriaModel.findById(id); 
        //return resultado;
        return await categoriaModel.findById(id);;
    }

    async getAll(){
        return await categoriaModel.find();
    }

    async getById(id){
        return await categoriaModel.findById(id);
    }

    async delete(id){
        return await categoriaModel.findByIdAndRemove(id);
    }

}

module.exports = categoriaRepository;