var Livreur = require('../models/livreur.model');

exports.getLivreurs = async function(req, res) {
  try {
    var livreurs = await Livreur.find().populate('commandes');
    res.status(200).json(livreurs);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.getLivreurById = async function(req, res) {
  try {
    var livreur = await Livreur.findById(req.params.id).populate('commandes');
    if (!livreur) return res.status(404).json('error');
    res.status(200).json(livreur);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.getLivreursDisponibles = async function(req, res) {
  try {
    var livreurs = await Livreur.find({ disponible: true });
    res.status(200).json(livreurs);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.createLivreur = async function(req, res) {
  try {
    var newLivreur = new Livreur(req.body);
    var savedLivreur = await newLivreur.save();
    res.status(201).json(savedLivreur);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.updateLivreur = async function(req, res) {
  try {
    var livreur = await Livreur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livreur) return res.status(404).json('error');
    res.status(200).json(livreur);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.updateDisponibilite = async function(req, res) {
  try {
    var livreur = await Livreur.findByIdAndUpdate(
      req.params.id, 
      { disponible: req.body.disponible }, 
      { new: true }
    );
    if (!livreur) return res.status(404).json('error');
    res.status(200).json(livreur);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.deleteLivreur = async function(req, res) {
  try {
    var livreur = await Livreur.findByIdAndDelete(req.params.id);
    if (!livreur) return res.status(404).json('error');
    res.status(200).json('error');
  } catch (error) {
    res.status(500).json('error');
  }
};