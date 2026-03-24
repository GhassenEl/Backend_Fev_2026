// @ts-nocheck
var express = require("express");
var router = express.Router();
var { requireAuth } = require("../middlewares/authMiddleware");
var { requireAdmin } = require("../middlewares/roleMiddleware");
var usersController = require("../controllers/users.controller");
var clientController = require("../controllers/client.controller");
var produitController = require("../controllers/produit.controller");
var commandeController = require("../controllers/commande.controller");
var evaluationController = require("../controllers/evaluation.controller");
var livreurController = require("../controllers/livreur.controller");
var animalController = require("../controllers/animal.controller");
var panierController = require("../controllers/panier.controller");

// Apply auth and admin check to all admin routes
router.use(requireAuth);
router.use(requireAdmin);

// Users
router.get("/users", usersController.getUsers);
router.get("/users/:id", usersController.getUserById);
router.post("/users", usersController.createUser);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);

// Clients
router.get("/clients", clientController.getClients);
router.get("/clients/:id", clientController.getClientById);
router.get("/clients/:id/animaux", clientController.getClientWithAnimaux);
router.post("/clients", clientController.createClient);
router.put("/clients/:id", clientController.updateClient);
router.delete("/clients/:id", clientController.deleteClient);

// Produits
router.get("/produits", produitController.getProduits);
router.get("/produits/:id", produitController.getProduitById);
router.get(
  "/produits/categorie/:categorie",
  produitController.getProduitsByCategorie,
);
router.post("/produits", produitController.createProduit);
router.put("/produits/:id", produitController.updateProduit);
router.put("/produits/:id/stock", produitController.updateStock);
router.delete("/produits/:id", produitController.deleteProduit);

// Commandes
router.get("/commandes", commandeController.getCommandes);
router.get("/commandes/:id", commandeController.getCommandeById);
router.get(
  "/commandes/client/:clientId",
  commandeController.getCommandesByClient,
);
router.post("/commandes", commandeController.createCommande);
router.put("/commandes/:id/statut", commandeController.updateStatut);
router.delete("/commandes/:id", commandeController.deleteCommande);

// Evaluations
router.get("/evaluations", evaluationController.getEvaluations);
router.get("/evaluations/:id", evaluationController.getEvaluationById);
router.get(
  "/evaluations/produit/:produitId",
  evaluationController.getEvaluationsByProduit,
);
router.get(
  "/evaluations/livreur/:livreurId",
  evaluationController.getEvaluationsByLivreur,
);
router.post("/evaluations", evaluationController.createEvaluation);
router.put("/evaluations/:id", evaluationController.updateEvaluation);
router.delete("/evaluations/:id", evaluationController.deleteEvaluation);

// Livreur
router.get("/livreurs", livreurController.getLivreurs);
router.get("/livreurs/:id", livreurController.getLivreurById);
router.get(
  "/livreurs/disponible/disponibles",
  livreurController.getLivreursDisponibles,
);
router.post("/livreurs", livreurController.createLivreur);
router.put("/livreurs/:id", livreurController.updateLivreur);
router.put(
  "/livreurs/:id/disponibilite",
  livreurController.updateDisponibilite,
);
router.delete("/livreurs/:id", livreurController.deleteLivreur);

// Animaux
router.get("/animaux", animalController.getAnimaux);
router.get("/animaux/:id", animalController.getAnimalById);
router.get(
  "/animaux/proprietaire/:clientId",
  animalController.getAnimauxByProprietaire,
);
router.post("/animaux", animalController.createAnimal);
router.put("/animaux/:id", animalController.updateAnimal);
router.delete("/animaux/:id", animalController.deleteAnimal);

// Paniers - admin can view/manage all carts if needed
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

module.exports = router;
