// @ts-nocheck
var express = require('express');
var router = express.Router();
var animalController = require('../controllers/animal.controller');

router.get('/', animalController.getAnimaux);
router.get('/:id', animalController.getAnimalById);
router.get('/proprietaire/:clientId', animalController.getAnimauxByProprietaire);
router.post('/', animalController.createAnimal);
router.put('/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;
