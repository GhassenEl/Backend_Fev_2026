const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
// Routes CRUD
router.post("/", clientController.createClient); // create
router.get("/", clientController.getAllClients); // READ ALL
router.get("/:id", clientController.getClientById); // READ ONE
router.put("/:id", clientController.updateClient); // UPDATE
router.delete("/:id", clientController.deleteClient); // DELETE

module.exports = router;
