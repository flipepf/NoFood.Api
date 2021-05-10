'use strict'

const mongoose = require('mongoose');

//Não mais por function (método antes realizado no model), mas por class 
class repositoryBase{
    
    constructor(model){
        this._model = mongoose.model(model);
    }

    async create(data){
        let modelo = new this._model(data);
        return await modelo.save();
    }

    async update(id, data){
        await this._model.findByIdAndUpdate(id, {$set: data});
        return await this._model.findById(id);;
    }

    async getAll(){
        return await this._model.find();
    }

    async getById(id){
        return await this._model.findById(id);
    }

    async delete(id){
        return await this._model.findByIdAndRemove(id);
    }

}

module.exports = repositoryBase;