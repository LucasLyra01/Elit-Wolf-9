const createUserModel = require('../models/cadastro-model');

exports.cadastrarUsuario = (req, res) => {
    createUserModel.find((error, cadastros) => {
        if(error){
            console.log("Não foi possível fazer o cadastro");
            res.json({
                status: 'erro',
                message: "Não foi possível realizar o cadastros"
            });
        }

        for (let i = 0; i < cadastros.length; i++) {
            if(req.body.email === cadastros[i].email) {
                res.json({
                    status: 'erro',
                    message: `O email ${req.body.email} já está cadastrado`
                });
                return;
            }
        }

        let cadastro = new createUserModel();

        cadastro.nome_pessoa = req.body.nome_pessoa;
        cadastro.data_nascimento = req.body.data_nascimento;
        cadastro.email = req.body.email;
        cadastro.senha = req.body.senha;

        console.log(cadastro.nome_pessoa);

        cadastro.save((error) => {
            if(error){
                res.send({
                    status: 'erro',
                    message: error
                });
            }else{
                res.send({
                    status: 'ok',
                    message: `O cadastro foi realizado com sucesso, ${cadastro.nome_pessoa}`
                });
            }
        });
    });
}

exports.listarCadastros = (req, res) => {
    createUserModel.find((error, cadastros) => {
        if(error){
            console.log("Não foi possível listar os cadastros");
            res.json({
                status: 'error',
                message: "Não foi possível listar os cadastros"
            });
        }else{
            res.json({
                status: 'ok',
                message: cadastros
            });
        }
    });
}

exports.listarCadastrosPorId = (req, res) => {
    let id_cadastro = req.params.id;

    createUserModel.findById(id_cadastro, (error, cadastros) => {
        if(error || !cadastros){
            console.log(`Não foi possível encontrar o cadastro do id ${id_cadastro}`);
            res.json({
                status: 'erro',
                message: `Não foi possível encontrar o cadastro do id ${id_cadastro}`
            });
        }else{
            console.log(`O id ${id_cadastro} foi encontrado na base de dados`);
            res.json({
                status: 'ok',
                message: cadastros
            });
        }
    });
}

exports.atualizarCadastros = (req, res) => {
    let id_cadastro = req.params.id;

    createUserModel.findById(id_cadastro, (error, cadastros) => {
        if(error || !cadastros){
            console.log(`Não foi possível atualizar o cadastro do id ${id_cadastro}`);
            res.json({
                status: 'error',
                message: `Não foi possível atualizar o cadastro do id ${id_cadastro}`
            });
        }else{

            cadastros.nome_pessoa = req.body.nome_pessoa;
            cadastros.data_nascimento = req.body.data_nascimento;;
            cadastros.email = req.body.email;
            cadastros.senha = req.body.senha;

            cadastros.save((error) => {
                if(error){
                    res.json({
                        status: 'erro',
                        message: `Houve um erro ao atualizar o cadastro com o id ${id_cadastro} ${error}`
                    });
                }else{
                    res.json({
                        status: 'ok',
                        message: `${cadastros.nome_pessoa}, seus dados foram atualizados com sucesso`,
                        novoCadastro: cadastros
                    });
                }
            });
        }
    });
}

exports.removerCadastro = (req, res) => {
    let id_cadastro = req.params.id;

    createUserModel.remove({
        _id: id_cadastro
    }, (error, cadastros) => {
        if(error){
            res.json({
                status: 'erro',
                message: `Não foi possível remover seu cadastro, ${cadastros.nome_pessoa}`
            });
        }else{
            res.json({
                status: 'ok', 
                message: `Seu perfil foi deletado com sucesso`
            });
        }
    });
}