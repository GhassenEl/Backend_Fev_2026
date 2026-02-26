// @ts-nocheck
var express = require('express');
var router = express.Router();
var evaluationController = require('../controllers/evaluation.controller');

router.get('/', evaluationController.getEvaluations);
router.get('/:id', evaluationController.getEvaluationById);
router.get('/produit/:produitId', evaluationController.getEvaluationsByProduit);
router.get('/livreur/:livreurId', evaluationController.getEvaluationsByLivreur);
router.post('/', evaluationController.createEvaluation);
router.put('/:id', evaluationController.updateEvaluation);
router.delete('/:id', evaluationController.deleteEvaluation);

module.exports = router;