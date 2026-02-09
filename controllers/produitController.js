const Produit = require("../models/Produit");

// Créer un produit
exports.createProduit = async (req, res) => {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire tous les produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire un produit par ID
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    res.json(produit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un produit
exports.updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!produit) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    res.json(produit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un produit
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rechercher des produits
exports.searchProduits = async (req, res) => {
  try {
    const { nom, categorie, minPrix, maxPrix } = req.query;
    let query = {};

    if (nom) query.nom = { $regex: nom, $options: "i" };
    if (categorie) query.categorie = categorie;
    if (minPrix || maxPrix) {
      query.prix = {};
      if (minPrix) query.prix.$gte = Number(minPrix);
      if (maxPrix) query.prix.$lte = Number(maxPrix);
    }

    const produits = await Produit.find(query);
    res.json(produits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
