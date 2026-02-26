// @ts-nocheck
var express = require('express');
var router = express.Router();
var clientController = require('../controllers/client.controller');

router.get('/', clientController.getClients);
router.get('/:id', clientController.getClientById);
router.get('/:id/animaux', clientController.getClientWithAnimaux);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;