//CONTROLLER BASE JA FAZ TODA A PARTE DE VALIDAÇÃO, MSG'S DE LOGS, ETC.. DE UMA VEZ SÓ
//--------------------------------------------------------------------------------------------------------------
exports.post = async(repository, validationContract, req, res) => {
    try {
        let data = req.body; //PEGA A INFORMAÇÃO DA REQUISIÇÃO NA VAR data
        
        if (!validationContract.isValid()) { //SE NÃO FOR VÁLIDO MANDA CODIGO E MSG DE ERRO
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição.', 
                validation: validationContract.errors()
            }).end();
            return; //FINALIZA AQUI
        }
        
        //SE FOR VALIDO ACESSA A FUNÇÃO CREATE DENTRO DO REPOSITORY - PASSANDO O BODY DA REQUISIÇÃO NO PARAMETRO data
        let resultado = await repository.create(data);
        res.status(201).send(resultado);
    } catch (err){
        console.log('POST com error, motivo: ', error);
        res.status(500).send({message: 'Erro no processamento ', error:err});
    }
};
//--------------------------------------------------------------------------------------------------------------
exports.put = async(repository, validationContract, req, res) => {
    try {
        let data = req.body; //PEGA A INFORMAÇÃO DA REQUISIÇÃO NA VAR data
        
        if (!validationContract.isValid()) { //SE NÃO FOR VÁLIDO MANDA CODIGO E MSG DE ERRO
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição.', 
                validation: validationContract.errors()
            }).end();
            return; //FINALIZA AQUI
        }
        //SE FOR VALIDO ACESSA A FUNÇÃO UPDATE DENTRO DO REPOSITORY - PASSANDO O BODY E O ID
        let resultado = await repository.update(req.params.id, data);
        res.status(202).send(resultado);
    } catch (err){
        console.log('PUT com error, motivo: ', error);
        res.status(500).send({message: 'Erro no processamento ', error:err});
    }
};
//--------------------------------------------------------------------------------------------------------------
exports.get = async(repository, req, res) => {
    try {
        let resultado = await repository.getAll();
        res.status(200).send(resultado);
    } catch (err){
        console.log('GET com error, motivo: ', error);
        res.status(500).send({message: 'Erro no processamento ', error:err});
    }
};
//--------------------------------------------------------------------------------------------------------------
exports.getById = async(repository, req, res) => {
    try {
        let id = req.params.id;
        if (id) {  // SE VEIO O PARAMETRO ID != null || != undefined || != " " 
            let resultado = await repository.getById(id);
            res.status(200).send(resultado);
        } else {
            res.status(400).send({message: 'O parametro ID precisa ser informado.'});
        }
    } catch (err){
        console.log('GETBYID com error, motivo: ', error);
        res.status(500).send({message: 'Erro no processamento ', error:err});
    }
};
//--------------------------------------------------------------------------------------------------------------
exports.delete = async(repository, req, res) => {
    try {
        let id = req.params.id;
        if (id) {  // SE VEIO O PARAMETRO ID != null || != undefined || != " " 
            let resultado = await repository.delete(id);
            res.status(200).send({message: 'Registro excluído com sucesso!'});
        } else {
            res.status(400).send({message: 'O parametro ID precisa ser informado.'});
        }
    } catch (err){
        console.log('DELETE com error, motivo: ', error);
        res.status(500).send({message: 'Erro no processamento ', error:err});
    }
};