const panierModel = require("../models/panier.model");

module.exports.getAllPaniers = async (req, res) => {
  try {
    const paniers = await panierModel.find();
    if (paniers.length === 0) {
      throw new Error("No paniers found");
    }
    res
      .status(200)
      .json({ message: "Paniers retrieved successfully", data: paniers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getPanierById = async (req, res) => {
  try {
    const panierId = req.params.id;

    const panier = await panierModel.findById(panierId);
    if (!panier) {
      throw new Error("Panier not found");
    }
    res
      .status(200)
      .json({ message: "Panier retrieved successfully", data: panier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getPanierByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const panier = await panierModel.findOne({ client_id: clientId });
    if (!panier) {
      throw new Error("Panier not found for this client");
    }
    res
      .status(200)
      .json({ message: "Panier retrieved successfully", data: panier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createPanier = async (req, res) => {
  try {
    const { client_id, produits, total } = req.body;
    const newPanier = new panierModel({ client_id, produits, total });
    await newPanier.save();
    res
      .status(201)
      .json({ message: "Panier created successfully", data: newPanier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.addProductToPanier = async (req, res) => {
  try {
    const panierId = req.params.id;
    const { produit_id, quantite, prix } = req.body;

    const panier = await panierModel.findById(panierId);
    if (!panier) {
      throw new Error("Panier not found");
    }

    // Check if product already exists in cart
    const existingProductIndex = panier.produits.findIndex(
      (p) => p.produit_id.toString() === produit_id,
    );

    if (existingProductIndex > -1) {
      // Update quantity
      panier.produits[existingProductIndex].quantite += quantite;
    } else {
      // Add new product
      panier.produits.push({ produit_id, quantite, prix });
    }

    // Recalculate total
    panier.total = panier.produits.reduce(
      (sum, p) => sum + p.prix * p.quantite,
      0,
    );

    await panier.save();
    res
      .status(200)
      .json({ message: "Product added to panier successfully", data: panier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.removeProductFromPanier = async (req, res) => {
  try {
    const panierId = req.params.id;
    const { produit_id } = req.body;

    const panier = await panierModel.findById(panierId);
    if (!panier) {
      throw new Error("Panier not found");
    }

    panier.produits = panier.produits.filter(
      (p) => p.produit_id.toString() !== produit_id,
    );

    panier.total = panier.produits.reduce(
      (sum, p) => sum + p.prix * p.quantite,
      0,
    );

    await panier.save();
    res
      .status(200)
      .json({
        message: "Product removed from panier successfully",
        data: panier,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.clearPanier = async (req, res) => {
  try {
    const panierId = req.params.id;

    const panier = await panierModel.findById(panierId);
    if (!panier) {
      throw new Error("Panier not found");
    }

    panier.produits = [];
    panier.total = 0;

    await panier.save();
    res
      .status(200)
      .json({ message: "Panier cleared successfully", data: panier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deletePanier = async (req, res) => {
  try {
    const panierId = req.params.id;
    const deletedPanier = await panierModel.findByIdAndDelete(panierId);
    if (!deletedPanier) {
      throw new Error("Panier not found");
    }
    res
      .status(200)
      .json({ message: "Panier deleted successfully", data: deletedPanier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
