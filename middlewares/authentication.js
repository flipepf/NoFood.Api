const jwt = require ('jsonwebtoken');
const variables = require ('../bin/configuration/variables');

module.exports = async (req, res, next) => {
    let token = req.body.token || req.query.query || req.headers['x-access-token']; //VERIFICA SE RECEBEU O TOKEN POR 3 MÉTODOS
    if (token){
        try {
            let decoded = await jwt.verify(token, variables.Security.secretKey); //TENTA DECODIFICAR O TOKEN
            console.log(decoded); //MOSTRA NO CONSEOLE O QUE VEIO DA REQUISIÇÃO
            req.usuarioLogado = decoded; // ATRIBUI A UMA VARIAVEL NA REQUISIÇÃO O USUARIO LOGADO
            next();
        } catch(error){
            res.status(401).send({message: 'Token informado é inválido.'});
            return;
        }

    } else {
        res.status(401).send({message: 'Necessário informar um token para acessar este recurso.'});
        return;
    }
}