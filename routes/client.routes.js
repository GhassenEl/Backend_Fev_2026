var express = require("express");
var router = express.Router();
const clientController = require("../controllers/client.controller");
const upload = require("../middlewares/uploadfile");
const logMiddleware = require("../middlewares/LogMiddleware");

/* GET all clients */
router.get("/GetAllClients", logMiddleware, clientController.getAllClients);

/* GET client by ID */
router.get("/GetClientById/:id", clientController.getClientById);

/* POST create client */
router.post("/CreateClient", clientController.createClient);

/* POST create client with image */
router.post(
  "/CreateClientWithImage",
  upload.single("client_image"),
  logMiddleware,
  clientController.createClientWithImage,
);

/* DELETE client */
router.delete("/DeleteClient/:id", clientController.deleteClient);

/* PUT update client */
router.put("/UpdateClient/:id", clientController.updateClient);

module.exports = router;
