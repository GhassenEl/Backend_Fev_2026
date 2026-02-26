// @ts-nocheck
var express = require('express');
var router = express.Router();
var panierController = require('../controllers/panier.controller');

router.get('/client/:clientId', panierController.getPanierByClient);
router.post('/', panierController.createPanier);
router.post('/:panierId/produits', panierController.addProduct);
router.put('/:panierId/produits/:produitId', panierController.updateQuantity);
router.delete('/:panierId/produits/:produitId', panierController.removeProduct);
router.delete('/:panierId/vider', panierController.clearPanier);

module.exports = router;