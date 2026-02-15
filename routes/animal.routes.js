var express = require("express");
var router = express.Router();
const animalController = require("../controllers/animal.controller");
const upload = require("../middlewares/uploadfile");
const logMiddleware = require("../middlewares/LogMiddleware");

/* GET all animals */
router.get("/GetAllAnimals", logMiddleware, animalController.getAllAnimals);

/* GET animal by ID */
router.get("/GetAnimalById/:id", animalController.getAnimalById);

/* POST create animal */
router.post("/CreateAnimal", animalController.createAnimal);

/* POST create animal with image */
router.post(
  "/CreateAnimalWithImage",
  upload.single("animal_image"),
  logMiddleware,
  animalController.createAnimalWithImage,
);

/* DELETE animal */
router.delete("/DeleteAnimal/:id", animalController.deleteAnimal);

/* PUT update animal */
router.put("/UpdateAnimal/:id", animalController.updateAnimal);

module.exports = router;
