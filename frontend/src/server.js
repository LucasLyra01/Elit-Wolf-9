
// const cataloga = require('../backend/robo/index');
const express = require('express');
const cors = require('cors');
const mongodb = require('./infra/mongodb');
const teste = require('./export');
const app = express();

console.log(teste);

// async function exportado(){
//     return await dados;
//     console.log(dados);
// }

// (async () => {
//     const p = new Promise((resolve, reject) => {
//         try {
//             resolve(exportado())
//         } catch (error) {
//             reject(error)
//         }
//     });
    
//     console.log(p);
// })();

 
const port = 5000;
const hostname = 'localhost';

app.use(cors());

const cadastroRoutes = require('./routes/cadastro-routes');
const cadastroGoogleRoutes = require('./routes/cadastro-google-routes');
const { values } = require('../backend/robo/index');

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