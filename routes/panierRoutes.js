const express = require("express");
const router = express.Router();
const panierController = require("../controllers/panierController");
// Routes CRUD
router.post("/", panierController.createPanier); //create
router.get("/", panierController.getAllPanier); // read all
router.get("/search", panierController.getPanierById); //read one
router.put("/:id", panierController.updatePanier); //update
router.delete("/:id", panierController.deletePanier); //suprression

module.exports = router;