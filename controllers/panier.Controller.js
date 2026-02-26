var Panier = require('../models/panier.model');
var Produit = require('../models/produit.model');

exports.getPanierByClient = async function(req, res) {
  try {
    var panier = await Panier.findOne({ client: req.params.clientId })
      .populate('produits.produit');
    
    if (!panier) {
      panier = new Panier({ client: req.params.clientId, produits: [] });
      await panier.save();
    }
    
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.createPanier = async function(req, res) {
  try {
    var existingPanier = await Panier.findOne({ client: req.body.client });
    if (existingPanier) return res.status(400).json('error');
    
    var newPanier = new Panier(req.body);
    var savedPanier = await newPanier.save();
    res.status(201).json(savedPanier);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.addProduct = async function(req, res) {
  try {
    var panier = await Panier.findById(req.params.panierId);
    if (!panier) return res.status(404).json('error');
    
    var { produitId, quantite } = req.body;
    var productIndex = panier.produits.findIndex(function(p) { 
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
    res.status(400).json('error');
  }
};

exports.updateQuantity = async function(req, res) {
  try {
    var panier = await Panier.findById(req.params.panierId);
    if (!panier) return res.status(404).json('error');
    
    var productIndex = panier.produits.findIndex(function(p) { 
      return p.produit.toString() === req.params.produitId; 
    });
    if (productIndex === -1) return res.status(404).json('error');
    
    panier.produits[productIndex].quantite = req.body.quantite;
    await panier.save();
    res.status(200).json(panier);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.removeProduct = async function(req, res) {
  try {
    var panier = await Panier.findById(req.params.panierId);
    if (!panier) return res.status(404).json('error');
    
    panier.produits = panier.produits.filter(function(p) { 
      return p.produit.toString() !== req.params.produitId; 
    });
    await panier.save();
    res.status(200).json(panier);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.clearPanier = async function(req, res) {
  try {
    var panier = await Panier.findById(req.params.panierId);
    if (!panier) return res.status(404).json('error');
    
    panier.produits = [];
    await panier.save();
    res.status(200).json('error');
  } catch (error) {
    res.status(400).json('error');
  }
};