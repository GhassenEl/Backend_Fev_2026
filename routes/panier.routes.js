const express = require("express");
const router = express.Router();

// Routes pour panier
router.get("/paniers", (req, res) => {
  res.json({ message: "Liste des paniers" });
});

router.get("/paniers/:id", (req, res) => {
  res.json({ message: `Panier avec ID: ${req.params.id}` });
});

router.post("/paniers", (req, res) => {
  res.status(201).json({
    message: "Panier créé",
    data: req.body,
  });
});

router.put("/paniers/:id", (req, res) => {
  res.json({
    message: `Panier ${req.params.id} mis à jour`,
    data: req.body,
  });
});

router.delete("/paniers/:id", (req, res) => {
  res.json({ message: `Panier ${req.params.id} supprimé` });
});

module.exports = router;
