let router = require('express').Router();

const cadastroGoogleControler = require('../controllers/cadastro-google-controller');

router.post('/', cadastroGoogleControler.cadastrarUsuario);

router.get('/', cadastroGoogleControler.listarCadastros);

router.get('/:id', cadastroGoogleControler.listarCadastrosPorId);

router.put('/:id', cadastroGoogleControler.atualizarCadastros);

router.delete('/:id', cadastroGoogleControler.removerCadastro);

module.exports = router;