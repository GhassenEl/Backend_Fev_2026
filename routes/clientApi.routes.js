// @ts-nocheck
var express = require("express");
var router = express.Router();
var { requireAuth } = require("../middlewares/authMiddleware");
var produitController = require("../controllers/produit.controller");
var panierController = require("../controllers/panier.controller");
var commandeController = require("../controllers/commande.controller");
var evaluationController = require("../controllers/evaluation.controller");
var animalController = require("../controllers/animal.controller");
var clientController = require("../controllers/client.controller");

// Apply auth to all client routes
router.use(requireAuth);

// Produits - view only
router.get("/produits", produitController.getProduits);
router.get("/produits/:id", produitController.getProduitById);
router.get(
  "/produits/categorie/:categorie",
  produitController.getProduitsByCategorie,
);

// Paniers - manage own cart
router.get("/paniers/client/:clientId", panierController.getPanierByClient);
router.post("/paniers", panierController.createPanier);
router.post("/paniers/:panierId/produits", panierController.addProduct);
router.put(
  "/paniers/:panierId/produits/:produitId",
  panierController.updateQuantity,
);
router.delete(
  "/paniers/:panierId/produits/:produitId",
  panierController.removeProduct,
);
router.delete("/paniers/:panierId/vider", panierController.clearPanier);

// Commandes - view/create own orders
router.get(
  "/commandes/client/:clientId",
  commandeController.getCommandesByClient,
);
router.post("/commandes", commandeController.createCommande);

// Evaluations - view by product, create
router.get(
  "/evaluations/produit/:produitId",
  evaluationController.getEvaluationsByProduit,
);
router.post("/evaluations", evaluationController.createEvaluation);

// Animaux - manage own animals
router.get(
  "/animaux/proprietaire/:clientId",
  animalController.getAnimauxByProprietaire,
);
router.post("/animaux", animalController.createAnimal);
router.put("/animaux/:id", animalController.updateAnimal);
router.delete("/animaux/:id", animalController.deleteAnimal);

// Clients - own profile
router.get("/clients/:id", clientController.getClientById);
router.put("/clients/:id", clientController.updateClient);

module.exports = router;
