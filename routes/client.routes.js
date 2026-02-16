const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");
const upload = require("../config/upload.config");

// Upload de photo de profil pour client
router.post(
  "/clients",
  upload.client.single("avatar"),
  clientController.createClient,
);

router.put(
  "/clients/:id",
  upload.client.single("avatar"),
  clientController.updateClient,
);

router.get("/clients", clientController.getAllClients);
router.get("/clients/:id", clientController.getClientById);
router.delete("/clients/:id", clientController.deleteClient);

module.exports = router;
