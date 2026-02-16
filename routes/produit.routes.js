const express = require("express");
const router = express.Router();
const produitController = require("../controllers/produit.controller");
const upload = require("../config/upload.config");

// Upload d'image pour produit (photo du plat)
router.post(
  "/produits",
  upload.produit.single("image"),
  produitController.createProduit,
);

router.put(
  "/produits/:id",
  upload.produit.single("image"),
  produitController.updateProduit,
);

// Upload multiple (plusieurs photos)
router.post(
  "/produits/:id/images",
  upload.produit.array("images", 5), // Max 5 images
  produitController.addProduitImages,
);

router.get("/produits", produitController.getAllProduits);
router.get("/produits/:id", produitController.getProduitById);
router.delete("/produits/:id", produitController.deleteProduit);

module.exports = router;
