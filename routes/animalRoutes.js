const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animalController");

router.post("/", animalController.createAnimal);
router.get("/", animalController.getAllAnimaux);
router.get("/client/:clientId", animalController.getAnimauxByClient);

module.exports = router;
