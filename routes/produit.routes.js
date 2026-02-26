// @ts-nocheck
var express = require('express');
var router = express.Router();
var produitController = require('../controllers/produit.controller');

router.get('/', produitController.getProduits);
router.get('/:id', produitController.getProduitById);
router.get('/categorie/:categorie', produitController.getProduitsByCategorie);
router.post('/', produitController.createProduit);
router.put('/:id', produitController.updateProduit);
router.put('/:id/stock', produitController.updateStock);
router.delete('/:id', produitController.deleteProduit);

module.exports = router;
