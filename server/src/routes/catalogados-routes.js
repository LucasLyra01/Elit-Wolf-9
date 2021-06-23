let router = require('express').Router();

const cadastroController = require('../controllers/catalogados-controller');

router.post('/', cadastroController.cadastrarCatalogacao);

router.get('/', cadastroController.listarCatalogados);

router.delete('/:id', cadastroController.removerCatalogados);

module.exports = router;