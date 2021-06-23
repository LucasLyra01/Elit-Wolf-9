const axios = require('axios');
const data = new Date();

(async function(){
    await axios.get('http://localhost:5000/catalogacao')
        .then((response) => {
            // process.exit(0);
            if(response.data.message.length > 0){
                console.log("Tem alguma coisa aqui dentro");
                console.log(response.data.message);
            }else{
                console.log("Não tem nada aqui");
            }
        });
    
    
    
    
        // .then((response) => {
        //     console.log(response.data.message);
        //     if(response.data.message.length > 0){
        //         console.log(response.data.message[0].data_criacao);
        //         console.log(response.data.message[0]._id);
        //         console.log(data.toLocaleDateString());
        //     }else{
        //         console.log("Vazio");
        //     }
        // });
})();
