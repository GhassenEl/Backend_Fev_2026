var Panier = require("../models/panier.model");
var Produit = require("../models/produit.model");

exports.getPanierByClient = async function (req, res) {
  try {
    if (
      req.user.role !== "admin" &&
      req.params.clientId !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }
    var panier = await Panier.findOne({ client: req.params.clientId }).populate(
      "produits.produit",
    );

    if (!panier) {
      panier = new Panier({ client: req.params.clientId, produits: [] });
      await panier.save();
    }

    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createPanier = async function (req, res) {
  try {
    req.body.client = req.user._id;
    var existingPanier = await Panier.findOne({ client: req.user._id });
    if (existingPanier)
      return res.status(400).json({ error: "Panier already exists" });

    var newPanier = new Panier(req.body);
    var savedPanier = await newPanier.save();
    res.status(201).json(savedPanier);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

exports.addProduct = async function (req, res) {
  try {
    var panier = await Panier.findById(req.params.panierId);
    if (!panier) return res.status(404).json({ error: "Panier not found" });
    if (
      req.user.role !== "admin" &&
      panier.client.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    var { produitId, quantite } = req.body;
    var productIndex = panier.produits.findIndex(function (p) {
      return p.produit.toString() === produitId;
    });

    if (productIndex > -1) {
      panier.produits[productIndex].quantite += quantite;
    } else {
      panier.produits.push({ produit: produitId, quantite: quantite });
    }

    await panier.save();
    res.status(200).json(panier);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

exports.updateQuantity = async function (req, res) {
  try {
    var panier = await Panier.findById(req.params.panierId);
    if (!panier) return res.status(404).json({ error: "Panier not found" });
    if (
      req.user.role !== "admin" &&
      panier.client.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    var productIndex = panier.produits.findIndex(function (p) {
      return p.produit.toString() === req.params.produitId;
    });
    if (productIndex === -1)
      return res.status(404).json({ error: "Product not in panier" });

    panier.produits[productIndex].quantite = req.body.quantite;
    await panier.save();
    res.status(200).json(panier);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

exports.removeProduct = async function (req, res) {
  try {
    var panier = await Panier.findById(req.params.panierId);
    if (!panier) return res.status(404).json({ error: "Panier not found" });
    if (
      req.user.role !== "admin" &&
      panier.client.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    panier.produits = panier.produits.filter(function (p) {
      return p.produit.toString() !== req.params.produitId;
    });
    await panier.save();
    res.status(200).json(panier);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

exports.clearPanier = async function (req, res) {
  try {
    var panier = await Panier.findById(req.params.panierId);
    if (!panier) return res.status(404).json({ error: "Panier not found" });
    if (
      req.user.role !== "admin" &&
      panier.client.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    panier.produits = [];
    await panier.save();
    res.status(200).json({ message: "Panier cleared" });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};
