const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");
// Routes CRUD
router.post("/", commandeController.createCommande); // create
router.get("/", commandeController.getAllCommande); // READ ALL
router.get("/:id", commandeController.getCommandeById); // READ ONE
router.put("/:id", commandeController.updateCommande); // UPDATE
router.delete("/:id", commandeController.deleteCommande); // DELETE

module.exports = router;
