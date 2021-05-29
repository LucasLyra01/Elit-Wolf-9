const mongoose = require('mongoose');

const srtConnection = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@banco.saisu.mongodb.net/projeto1?retryWrites=true&w=majority`;

mongoose.connect(srtConnection, {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;

db.on('error', console.error.bind(console, "Erro ao conectar no Mongo"));
db.once('open', function(){
    console.log("Banco de dados conectado com sucesso");
});

module.exports = db;