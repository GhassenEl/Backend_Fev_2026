var express = require("express");
var router = express.Router();
const produitController = require("../controllers/produit.controller");
const upload = require("../middlewares/uploadfile");
const logMiddleware = require("../middlewares/LogMiddleware");

/* GET all produits */
router.get("/GetAllProduits", logMiddleware, produitController.getAllProduits);

/* GET produit by ID */
router.get("/GetProduitById/:id", produitController.getProduitById);

/* GET produits by categorie */
router.get(
  "/GetProduitsByCategorie/:categorie",
  produitController.getProduitsByCategorie,
);

/* GET produits by animal cible */
router.get(
  "/GetProduitsByAnimal/:animal",
  produitController.getProduitsByAnimal,
);

/* GET search produits */
router.get("/SearchProduits", produitController.searchProduits);

/* GET produits en promotion */
router.get("/GetProduitsPromotion", produitController.getProduitsPromotion);

/* GET nouveaux produits */
router.get("/GetNouveauxProduits", produitController.getNouveauxProduits);

/* GET meilleures ventes */
router.get("/GetMeilleuresVentes", produitController.getMeilleuresVentes);

/* POST create produit */
router.post("/CreateProduit", produitController.createProduit);

/* POST create produit with images */
router.post(
  "/CreateProduitWithImages",
  upload.array("produit_images", 5),
  logMiddleware,
  produitController.createProduitWithImages,
);

/* PUT update produit */
router.put("/UpdateProduit/:id", produitController.updateProduit);

/* PUT update stock */
router.put("/UpdateStock/:id", produitController.updateStock);

/* PUT update prix */
router.put("/UpdatePrix/:id", produitController.updatePrix);

/* PUT add image */
router.post(
  "/AddImage/:id",
  upload.single("produit_image"),
  produitController.addImage,
);

/* DELETE image */
router.delete("/DeleteImage/:id/:imageIndex", produitController.deleteImage);

/* DELETE produit */
router.delete("/DeleteProduit/:id", produitController.deleteProduit);

module.exports = router;
