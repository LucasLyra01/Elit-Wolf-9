require('dotenv').config({
    path: '.env'
});

const express = require('express');
const cors = require('cors');
const mongodb = require('./infra/mongodb');
const catalogador = require('../robo/index');
const app = express();

try {
    catalogacao();
    console.log(catalogacao);
} catch (error) {
    
}

const port = process.env.APP_PORT;
const hostname = process.env.APP_HOSTNAME;

app.use(cors());

const cadastroRoutes = require('./routes/cadastro-routes');
const cadastroGoogleRoutes = require('./routes/cadastro-google-routes');
const catalogadosRoutes = require('./routes/catalogados-routes')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.use('/api/cadastro', cadastroRoutes);
app.use('/api/cadastrogoogle', cadastroGoogleRoutes);
app.use('/catalogacao', catalogadosRoutes);

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: `O servidor da Elite Wolf está rodando`
    })
})

app.listen(port, hostname, () => {
    console.log(`O servidor da Elite Wolf está rodando em: http://${hostname}:${port}`);
});