let router = require('express').Router();

const cadastroController = require('../controllers/cadastro-controller');

router.post('/', cadastroController.cadastrarUsuario);

router.get('/', cadastroController.listarCadastros);

router.get('/:id', cadastroController.listarCadastrosPorId);

router.put('/:id', cadastroController.atualizarCadastros);

router.delete('/:id', cadastroController.removerCadastro);

module.exports = router;