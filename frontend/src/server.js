const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

const port = 5000;
const hostname = 'localhost';

app.use(cors());

const cadastroRoutes = require('./routes/cadastro-routes');
const cadastroGoogleRoutes = require('./routes/cadastro-google-routes');

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.use('/api/cadastro', cadastroRoutes);
app.use('/api/cadastrogoogle', cadastroGoogleRoutes);


mongoose.connect('mongodb://root:root@localhost:27017/projeto1?authSource=admin',
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Erro ao conectar no Mongo"));
db.once('open', function(){
    console.log("Banco de dados conectado com sucesso");
});

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: `O servidor da Elite Wolf está rodando`
    })
})

app.listen(port, hostname, () => {
    console.log(`O servidor da Elite Wolf está rodando em: http://${hostname}:${port}`);
});

