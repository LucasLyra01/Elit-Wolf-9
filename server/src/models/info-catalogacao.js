const mongoose = require('mongoose');

const infosCatalogados = mongoose.Schema({
    infos: {
        type: mongoose.Schema.Types.Array,
        required: false
    },
    data_criacao: {
        type: mongoose.Schema.Types.String,
        required: false
    }
});

let Cadastro = module.exports = mongoose.model('infosCatalogados', infosCatalogados);

module.exports.get = function(callback, limit){
    Cadastro.find(callback).limit(limit);
}