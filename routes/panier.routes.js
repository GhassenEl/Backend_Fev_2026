var express = require("express");
var router = express.Router();
const panierController = require("../controllers/panier.controller.");
const logMiddleware = require("../middlewares/LogMiddleware");

/* GET all paniers */
router.get("/GetAllPaniers", logMiddleware, panierController.getAllPaniers);

/* GET panier by ID */
router.get("/GetPanierById/:id", panierController.getPanierById);

/* GET panier by client ID */
router.get(
  "/GetPanierByClient/:clientId",
  panierController.getPanierByClientId,
);

/* POST create panier */
router.post("/CreatePanier", panierController.createPanier);

/* POST create panier for client */
router.post(
  "/CreatePanierForClient/:clientId",
  panierController.createPanierForClient,
);

/* POST add product to panier */
router.post("/AddProduct/:id", panierController.addProductToPanier);

/* PUT update product quantity */
router.put(
  "/UpdateProductQuantity/:id",
  panierController.updateProductQuantity,
);

/* DELETE remove product from panier */
router.delete("/RemoveProduct/:id", panierController.removeProductFromPanier);

/* PUT apply promo code */
router.put("/ApplyPromoCode/:id", panierController.applyPromoCode);

/* PUT clear panier */
router.put("/ClearPanier/:id", panierController.clearPanier);

/* DELETE panier */
router.delete("/DeletePanier/:id", panierController.deletePanier);

module.exports = router;
