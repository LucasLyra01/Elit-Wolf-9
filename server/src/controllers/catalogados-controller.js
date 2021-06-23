const createCatalogadosModel = require('../models/info-catalogacao');

exports.cadastrarCatalogacao = (req, res) => {
    const data = new Date();
    createCatalogadosModel.find((error, catalogados) => {
        if(error){
            console.log("Não foi possível cadastrar a catalogação");
            res.json({
                status: 'erro',
                message: "Não foi possível cadastrar a catalogação"
            });
        }

        for (let i = 0; i < catalogados.length; i++) {
            if(req.body.data_criacao === catalogados[i].data_criacao) {
                res.json({
                    status: 'erro',
                    message: `A catalogação do dia ${req.body.data_criacao} já está cadastrada`
                });
                return;
            }
        }

        let catalogado = new createCatalogadosModel();

        catalogado.infos = req.body.infos;
        catalogado.data_criacao = data.toLocaleDateString();

        console.log(catalogado.data_criacao);

        catalogado.save((error) => {
            if(error){
                res.send({
                    status: 'erro',
                    message: error
                });
            }else{
                res.send({
                    status: 'ok',
                    message: `O cadastro do dia ${catalogado.data_criacao} foi realizado com sucesso`
                });
            }
        });
    });
}

exports.listarCatalogados = (req, res) => {
    createCatalogadosModel.find((error, catalogados) => {
        if(error){
            console.log("Não foi possível listar os pares catalogados");
            res.json({
                status: 'error',
                message: "Não foi possível listar os pares catalogados"
            });
        }else{
            res.json({
                status: 'ok',
                message: catalogados
            });
        }
    });
}

exports.removerCatalogados = (req, res) => {
    let id_catalogados = req.params.id;

    createCatalogadosModel.remove({
        _id: id_catalogados
    }, (error, cadastros) => {
        if(error){
            res.json({
                status: 'erro',
                message: `Não foi possível remover a catalogação`
            });
        }else{
            res.json({
                status: 'ok', 
                message: `A catalogação foi deletada com sucesso`
            });
        }
    });
}