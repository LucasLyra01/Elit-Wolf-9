const axios = require('axios');

const data = {
    "nome_pessoa": "Lucas",
    "data_nascimento": "09012000",
    "email": "lucaslyra3@gmail.com",
    "senha": "teste123"
}

axios.put('http://localhost:5000/api/cadastro/60919607c57dcd308c1a5b0b', data).then((response) => {
    console.log(response.data.message);
});


// axios.get('http://localhost:5000/api/cadastro/', data).then(function(response) {
//     console.log(response.data);
// });