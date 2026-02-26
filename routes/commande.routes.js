// @ts-nocheck
var express = require('express');
var router = express.Router();
var commandeController = require('../controllers/commande.controller');

router.get('/', commandeController.getCommandes);
router.get('/:id', commandeController.getCommandeById);
router.get('/client/:clientId', commandeController.getCommandesByClient);
router.post('/', commandeController.createCommande);
router.put('/:id/statut', commandeController.updateStatut);
router.delete('/:id', commandeController.deleteCommande);

module.exports = router;