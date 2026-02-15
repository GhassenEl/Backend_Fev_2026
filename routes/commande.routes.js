var express = require("express");
var router = express.Router();
const commandeController = require("../controllers/commande.controller");
const logMiddleware = require("../middlewares/LogMiddleware");

/* GET all commandes */
router.get(
  "/GetAllCommandes",
  logMiddleware,
  commandeController.getAllCommandes,
);

/* GET commande by ID */
router.get("/GetCommandeById/:id", commandeController.getCommandeById);

/* GET commandes by client ID */
router.get(
  "/GetCommandesByClient/:clientId",
  commandeController.getCommandesByClient,
);

/* POST create commande */
router.post("/CreateCommande", commandeController.createCommande);

/* POST create commande from panier */
router.post(
  "/CreateCommandeFromPanier/:panierId",
  commandeController.createCommandeFromPanier,
);

/* PUT update commande */
router.put("/UpdateCommande/:id", commandeController.updateCommande);

/* PUT update commande status */
router.put(
  "/UpdateCommandeStatus/:id",
  commandeController.updateCommandeStatus,
);

/* DELETE commande */
router.delete("/DeleteCommande/:id", commandeController.deleteCommande);

module.exports = router;
