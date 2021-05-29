require('dotenv').config({
    path: '.env'
});

const express = require('express');
const cors = require('cors');
const mongodb = require('./infra/mongodb');
const app = express();

const catalogacao = require('../../robo/index');

try {
    catalogacao();
    console.log(catalogacao);
} catch (error) {
    
}


 
const port = 5000;
const hostname = '0.0.0.0';

app.use(cors());

const cadastroRoutes = require('./routes/cadastro-routes');
const cadastroGoogleRoutes = require('./routes/cadastro-google-routes');

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.use('/api/cadastro', cadastroRoutes);
app.use('/api/cadastrogoogle', cadastroGoogleRoutes);

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: `O servidor da Elite Wolf está rodando`
    })
})

app.listen(port, hostname, () => {
    console.log(`O servidor da Elite Wolf está rodando em: http://${hostname}:${port}`);
});