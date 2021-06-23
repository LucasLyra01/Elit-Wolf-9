const IQOption = require("./lib");
const axios = require('axios');

const conta_real_practice = "PRACTICE";
var logado = false;
let catalogacao = [];

const paridades = [
    'AUDUSD', 
    // 'EURAUD', 
    'EURCAD',
    // 'EURGBP', 'EURJPY', 'EURUSD', 
    // 'GBPAUD', 'GBPCAD', 'GBPCHF', 
    // 'GBPJPY', 'GBPUSD', 'AUDCAD',
    // 'AUDJPY', 'USDCHF', 'USDCAD',
];

const dias = 15;
const porcentagem = 80;
const timeframe = 5;

var porc_call = Math.abs(porcentagem);
var porc_put = Math.abs(100 - porcentagem);

function conectar_IQOption(){

  IQOption({
    email: "mageviskyalves@gmail.com",
    password: "!Senha321",
  })
    .then(async (API) => {
      logado = true;
      API.setBalance(conta_real_practice);
  
      if (logado == true) {
        operando(API);
      }
    })
    .catch((err) => {
      console.log(err);
  });

}

(async function(){
  await axios.get('http://localhost:5000/catalogacao')
    .then(async (response) => {
      var status_connection = await response.data.status;

      console.log("Conexão", status_connection);

      if(status_connection == 'ok'){
        if(response.data.message.length > 0){
          const data_connection = new Date();
          if(data_connection.toLocaleDateString() == await response.data.message[0].data_criacao){
            console.log("Essa data já está catalogada");
            
          }else{
            const id_catalogacao = await response.data.message[0]._id
            axios.delete(`http://localhost:5000/catalogacao/${id_catalogacao}`)
              .then(async (response) => {
                await console.log(response.data);

                //CRIANDO A CONEXÃO COM A NOSSA CONTA
                conectar_IQOption();

              });
          }
        }else{
          console.log("Vou catalogar as suas informações");
          //CRIANDO A CONEXÃO COM A NOSSA CONTA
          conectar_IQOption();
        }
      }else{
        console.log("Houve uma falha ao buscar as informações");
      }
    })
})();

// if(date_exists){
//   //CRIANDO A CONEXÃO COM A NOSSA CONTA
//   IQOption({
//     email: "mageviskyalves@gmail.com",
//     password: "!Senha321",
//   })
//     .then(async (API) => {
//       logado = true;
//       API.setBalance(conta_real_practice);
  
//       // console.log("Logado com sucesso \n");
  
//       if (logado == true) {
//         operando(API);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//   });
// }


async function operando(API) {
  try {
    async function cataloga(par, dias, porc_call, porc_put, timeframe) {
      let dados = [];
      let datas_testadas = [];
      let time = Date.now();
      let sair = false;

      // console.log("Catalogando", par);

      while (sair == false) {
        let velas = await API.getCandles(par, timeframe * 60, 1000, time);

        for (let x in velas) {
          let data_completa = await new Date(velas[x]["from"] * 1000);
          let novos_dias = data_completa.toLocaleDateString();
          let horas = data_completa.getHours();
          let minutos = data_completa.getMinutes();
          let geral = horas + ":" + minutos;

          if (datas_testadas.includes(novos_dias) == false) {
            await datas_testadas.push(novos_dias);
          }

          if (datas_testadas.length <= dias) {
            if (velas[x]["open"] < velas[x]["close"]) {
              velas[x]["cor"] = "verde";
              velas[x]["horario"] = geral;
            } else if (velas[x]["open"] > velas[x]["close"]) {
              velas[x]["cor"] = "vermelho";
              velas[x]["horario"] = geral;
            } else {
              velas[x]["cor"] = "doji";
              velas[x]["horario"] = geral;
            }

            dados.push(velas[x]);
          } else {
            sair = true;
          }
        }
        time = velas[0]["from"] - 1;
      }
      datas_testadas.sort();

      let analise = [];

      let meuInclude = function (analise, horario) {
        for (a in analise) {
          if (analise[a].horario == horario) return a;
        }
        return false;
      };

      for (vela of dados) {

        let horario = await vela.horario;
        let indice = await meuInclude(analise, horario);

        if (indice == false) {
          await analise.push({
            horario: horario,
            vermelho: vela.cor == "vermelho" ? 1 : 0,
            verde: vela.cor == "verde" ? 1 : 0,
            doji: vela.cor == "doji" ? 1 : 0,
            "%": 0,
            dir: "",
          });
        } else {
          if (vela.cor == `vermelho`) {
            await analise[indice].vermelho++;
          } else if (vela.cor == "verde") {
            await analise[indice].verde++;
          } else {
            await analise[indice].doji++;
          }
        }
      }

      for (i in analise) {

        let verde = analise[i].verde;
        let vermelho = analise[i].vermelho;
        let doji = analise[i].doji;

        if(verde > vermelho){
          analise[i].dir = "CALL"
          analise[i]['%'] =  Math.round(100 * (verde / (verde + vermelho + doji)))
        }else if (verde < vermelho){
          analise[i].dir = "PUT"
          analise[i]['%'] =  Math.round(100 * (vermelho / (verde + vermelho + doji)))
        }else{
          analise[i].dir = "NULO"
          analise[i]['%'] = 50
        }
      }
      return analise;
    }



    
    for (par of paridades) {
      catalogacao.push({
        par: par,
        dados: await cataloga(par, dias, porc_call, porc_put, timeframe)
      });
    }
   
    console.log();
    
    for (c in catalogacao) {
      for (dados2 of catalogacao[c].dados) {
        if(dados2["%"] > 85 && dados2["%"] < 100){
          console.log(`${catalogacao[c].par} | Horário ${dados2['horario']} | Direção ${dados2['dir']} | Assertividade ${dados2['%']}%`);
        }
      }
    }

    (async function(){

      const novo_horario = new Date();
  
      const cadastrar_dados = {
        infos: catalogacao,
        data_criacao: novo_horario.toLocaleDateString()
      }
      

      await axios.post('http://localhost:5000/catalogacao', cadastrar_dados)
        .then(async(response) => {
          await console.log(response.data.status);
          if(response.data.status == 'ok'){
            console.log("Catalogação salva");
          }else{
            console.log("Não foi possível salvar os dados no banco");
          }
        });

    })();

  } catch (error) {
    console.log(error);
  }
}

