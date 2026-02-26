// @ts-nocheck
var express = require('express');
var router = express.Router();
var livreurController = require('../controllers/livreur.controller');

router.get('/', livreurController.getLivreurs);
router.get('/:id', livreurController.getLivreurById);
router.get('/disponible/disponibles', livreurController.getLivreursDisponibles);
router.post('/', livreurController.createLivreur);
router.put('/:id', livreurController.updateLivreur);
router.put('/:id/disponibilite', livreurController.updateDisponibilite);
router.delete('/:id', livreurController.deleteLivreur);

module.exports = router;