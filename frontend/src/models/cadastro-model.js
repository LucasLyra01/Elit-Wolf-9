const mongoose = require('mongoose');

const cadastroSchema = mongoose.Schema({
    nome_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    sobrenome: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    data_nascimento: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    senha: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

let Cadastro = module.exports = mongoose.model('cadastros', cadastroSchema);

module.exports.get = function(callback, limit){
    Cadastro.find(callback).limit(limit);
}