const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animalController");
// Routes CRUD
router.post("/", animalController.createAnimal); //create
router.get("/", animalController.getAllAnimaux); //read all
router.get("/client/:clientId", animalController.getAnimauxByClient); //read one
router.put("/:id", animalController.updateAnimal); // UPDATE
router.delete("/:id", animalController.deleteAnimal); // DELETE

module.exports = router;
