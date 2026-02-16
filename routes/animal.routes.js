const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animal.controller");
const upload = require("../config/upload.config");

// Route avec upload d'image
router.post(
  "/animals",
  upload.animal.single("image"), // 'image' est le nom du champ dans le formulaire
  animalController.createAnimal,
);

router.put(
  "/animals/:id",
  upload.animal.single("image"),
  animalController.updateAnimal,
);

// Les autres routes sans upload
router.get("/animals", animalController.getAllAnimals);
router.get("/animals/:id", animalController.getAnimalById);
router.delete("/animals/:id", animalController.deleteAnimal);

module.exports = router;
