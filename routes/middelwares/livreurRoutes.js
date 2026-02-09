const express = require("express");
const router = express.Router();
const livreurController = require("../controllers/livreurController");
// Routes CRUD
router.post("/", livreurController.createLivreur); //create
router.get("/", livreurController.getAllLivreur); //read all
router.get("/client/:clientId", livreurController.getLivreurById); //read one
router.put("/:id", livreurController.updateLivreur); // UPDATE
router.delete("/:id", livreurController.deleteLivreur); // DELETE

module.exports = router;
