const axios = require('axios');

const data = {
    "nome_pessoa":"Acsa",
    "cpf": "123123132",
    "data_nascimento": "07/22/2001",
    "telefone_pessoa": "996059757",
    "grupo_prioritario": true,
    "endereco_pessoa": "Rua Acacia Roxa",
    "email_pessoa": "acsalourenciaalves@gmail.com"

}

axios.get('http://54.94.108.65:5000/api/cadastro').then((response) => {
    console.log(response.data.message);
});


// axios.get('http://localhost:5000/api/cadastro/', data).then(function(response) {
//     console.log(response.data);
// });