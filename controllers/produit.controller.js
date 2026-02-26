var Produit = require('../models/produit.model');

exports.getProduits = async function(req, res) {
  try {
    var produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.getProduitById = async function(req, res) {
  try {
    var produit = await Produit.findById(req.params.id);
    if (!produit) return res.status(404).json('error');
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.getProduitsByCategorie = async function(req, res) {
  try {
    var produits = await Produit.find({ categorie: req.params.categorie });
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.createProduit = async function(req, res) {
  try {
    var newProduit = new Produit(req.body);
    var savedProduit = await newProduit.save();
    res.status(201).json(savedProduit);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.updateProduit = async function(req, res) {
  try {
    var produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produit) return res.status(404).json('error');
    res.status(200).json(produit);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.updateStock = async function(req, res) {
  try {
    var produit = await Produit.findByIdAndUpdate(
      req.params.id, 
      { stock: req.body.stock }, 
      { new: true }
    );
    if (!produit) return res.status(404).json('error');
    res.status(200).json(produit);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.deleteProduit = async function(req, res) {
  try {
    var produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) return res.status(404).json('error');
    res.status(200).json('error');
  } catch (error) {
    res.status(500).json('error');
  }
};