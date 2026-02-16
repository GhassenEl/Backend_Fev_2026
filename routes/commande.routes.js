const express = require("express");
const router = express.Router();

router.get("/commandes", (req, res) =>
  res.json({ message: "Liste des commandes" }),
);
router.get("/commandes/:id", (req, res) =>
  res.json({ message: `Commande ${req.params.id}` }),
);
router.post("/commandes", (req, res) =>
  res.status(201).json({ message: "Commande créée", data: req.body }),
);
router.put("/commandes/:id", (req, res) =>
  res.json({ message: `Commande ${req.params.id} mise à jour` }),
);
router.delete("/commandes/:id", (req, res) =>
  res.json({ message: `Commande ${req.params.id} supprimée` }),
);

module.exports = router;
