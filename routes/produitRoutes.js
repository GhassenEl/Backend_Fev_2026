const express = require("express");
const router = express.Router();
const produitController = require("../controllers/produitController");
// Routes CRUD
router.post("/", produitController.createProduit); //create
router.get("/", produitController.getAllProduits); // read all
router.get("/search", produitController.getProduitById); //read one
router.put("/:id", produitController.updateProduit); //update
router.delete("/:id", produitController.deleteProduit); //suprression

module.exports = router;
