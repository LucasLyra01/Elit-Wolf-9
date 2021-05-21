const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@localhost:27017/projeto1?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Erro ao conectar no Mongo"));
db.once('open', function(){
    console.log("Banco de dados conectado com sucesso");
});

module.exports = db;