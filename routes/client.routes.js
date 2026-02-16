const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller.js");

// Route pour créer un nouveau client
router.post("/clients", clientController.createClient);

// Route pour récupérer tous les clients
router.get("/clients", clientController.getAllClients);

// Route pour récupérer un client par ID
router.get("/clients/:id", clientController.getClientById);

// Route pour mettre à jour un client
router.put("/clients/:id", clientController.updateClient);

// Route pour supprimer un client
router.delete("/clients/:id", clientController.deleteClient);

module.exports = router;
