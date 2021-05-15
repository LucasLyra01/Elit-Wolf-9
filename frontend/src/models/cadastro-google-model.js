const mongoose = require('mongoose');

const cadastroGoogleSchema = mongoose.Schema({
    nome_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    sobrenome: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    id_google:{
        type: mongoose.Schema.Types.String,
        required: true
    }
});

let CadastroGoogle = module.exports = mongoose.model('cadastrosGoogle', cadastroGoogleSchema);

module.exports.get = function(callback, limit){
    CadastroGoogle.find(callback).limit(limit);
}