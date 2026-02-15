const produitModel = require("../models/produit.model");

module.exports.getAllProduits = async (req, res) => {
  try {
    const produits = await produitModel.find();
    if (produits.length === 0) {
      throw new Error("No produits found");
    }
    res
      .status(200)
      .json({ message: "Produits retrieved successfully", data: produits });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProduitById = async (req, res) => {
  try {
    const produitId = req.params.id;

    const produit = await produitModel.findById(produitId);
    if (!produit) {
      throw new Error("Produit not found");
    }
    res
      .status(200)
      .json({ message: "Produit retrieved successfully", data: produit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProduitsByCategorie = async (req, res) => {
  try {
    const categorie = req.params.categorie;

    const produits = await produitModel.find({ categorie });
    if (produits.length === 0) {
      throw new Error("No produits found in this category");
    }
    res
      .status(200)
      .json({ message: "Produits retrieved successfully", data: produits });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createProduit = async (req, res) => {
  try {
    const { nom, description, prix, categorie, stock, animal_cible } = req.body;
    const newProduit = new produitModel({
      nom,
      description,
      prix,
      categorie,
      stock,
      animal_cible,
    });
    await newProduit.save();
    res
      .status(201)
      .json({ message: "Produit created successfully", data: newProduit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateProduit = async (req, res) => {
  try {
    const produitId = req.params.id;
    const { nom, description, prix, categorie, stock, animal_cible } = req.body;
    const updatedProduit = await produitModel.findByIdAndUpdate(
      produitId,
      { nom, description, prix, categorie, stock, animal_cible },
      { new: true },
    );
    if (!updatedProduit) {
      throw new Error("Produit not found");
    }
    res
      .status(200)
      .json({ message: "Produit updated successfully", data: updatedProduit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteProduit = async (req, res) => {
  try {
    const produitId = req.params.id;
    const deletedProduit = await produitModel.findByIdAndDelete(produitId);
    if (!deletedProduit) {
      throw new Error("Produit not found");
    }
    res
      .status(200)
      .json({ message: "Produit deleted successfully", data: deletedProduit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createProduitWithImage = async (req, res) => {
  try {
    const { nom, description, prix, categorie, stock, animal_cible } = req.body;
    const produit_image = req.file.filename;
    const newProduit = new produitModel({
      nom,
      description,
      prix,
      categorie,
      stock,
      animal_cible,
      produit_image,
    });
    await newProduit.save();
    res
      .status(201)
      .json({ message: "Produit created successfully", data: newProduit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateStock = async (req, res) => {
  try {
    const produitId = req.params.id;
    const { stock } = req.body;

    const updatedProduit = await produitModel.findByIdAndUpdate(
      produitId,
      { stock },
      { new: true },
    );
    if (!updatedProduit) {
      throw new Error("Produit not found");
    }
    res
      .status(200)
      .json({ message: "Stock updated successfully", data: updatedProduit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
