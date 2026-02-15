var express = require("express");
var router = express.Router();
const livreurController = require("../controllers/livreur.controller");
const upload = require("../middlewares/uploadfile");
const logMiddleware = require("../middlewares/LogMiddleware");

/* GET all livreurs */
router.get("/GetAllLivreurs", logMiddleware, livreurController.getAllLivreurs);

/* GET livreur by ID */
router.get("/GetLivreurById/:id", livreurController.getLivreurById);

/* GET available livreurs */
router.get("/GetAvailableLivreurs", livreurController.getAvailableLivreurs);

/* GET livreurs by zone */
router.get("/GetLivreursByZone/:ville", livreurController.getLivreursByZone);

/* POST create livreur */
router.post("/CreateLivreur", livreurController.createLivreur);

/* POST create livreur with photo */
router.post(
  "/CreateLivreurWithPhoto",
  upload.single("photo"),
  logMiddleware,
  livreurController.createLivreurWithPhoto,
);

/* POST upload document */
router.post(
  "/UploadDocument/:id",
  upload.single("document"),
  livreurController.uploadDocument,
);

/* PUT update livreur */
router.put("/UpdateLivreur/:id", livreurController.updateLivreur);

/* PUT update disponibilite */
router.put("/UpdateDisponibilite/:id", livreurController.updateDisponibilite);

/* PUT update statistiques */
router.put("/UpdateStatistiques/:id", livreurController.updateStatistiques);

/* DELETE livreur */
router.delete("/DeleteLivreur/:id", livreurController.deleteLivreur);

module.exports = router;
