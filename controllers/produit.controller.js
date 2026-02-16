const Produit = require('../models/Produit');

exports.createProduit = async (req, res) => {
  try {
    const produitData = {
      ...req.body,
      image: req.file ? `/images/produits/${req.file.filename}` : null
    };
    
    const produit = new Produit(produitData);
    await produit.save();
    
    res.status(201).json({
      success: true,
      message: "Produit créé avec succès",
      data: produit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addProduitImages = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    
    const images = req.files.map(file => `/images/produits/${file.filename}`);
    produit.images = [...(produit.images || []), ...images];
    
    await produit.save();
    
    res.json({
      success: true,
      message: "Images ajoutées avec succès",
      data: produit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};