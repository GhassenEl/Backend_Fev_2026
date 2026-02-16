const express = require("express");
const router = express.Router();
const livreurController = require("../controllers/livreur.controller");
const upload = require("../config/upload.config");

// Upload multiple (photo + permis)
router.post(
  "/livreurs",
  upload.livreur.fields([
    { name: "photo", maxCount: 1 },
    { name: "permis", maxCount: 1 },
  ]),
  livreurController.createLivreur,
);

router.put(
  "/livreurs/:id",
  upload.livreur.fields([
    { name: "photo", maxCount: 1 },
    { name: "permis", maxCount: 1 },
  ]),
  livreurController.updateLivreur,
);

router.get("/livreurs", livreurController.getAllLivreurs);
router.get("/livreurs/:id", livreurController.getLivreurById);
router.delete("/livreurs/:id", livreurController.deleteLivreur);

module.exports = router;
