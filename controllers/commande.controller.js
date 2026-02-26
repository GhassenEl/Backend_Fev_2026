var Commande = require('../models/commande.model');
var Client = require('../models/client.model');
var Produit = require('../models/produit.model');

exports.getCommandes = async function(req, res) {
  try {
    var commandes = await Commande.find()
      .populate('client', 'nom prenom')
      .populate('livreur', 'nom prenom')
      .populate('produits.produit', 'nom prix');
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.getCommandeById = async function(req, res) {
  try {
    var commande = await Commande.findById(req.params.id)
      .populate('client')
      .populate('livreur')
      .populate('produits.produit');
    if (!commande) return res.status(404).json('error');
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.getCommandesByClient = async function(req, res) {
  try {
    var commandes = await Commande.find({ client: req.params.clientId });
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.createCommande = async function(req, res) {
  try {
    var client = await Client.findById(req.body.client);
    if (!client) return res.status(404).json('error');
    
    var montantTotal = 0;
    for (var item of req.body.produits) {
      var produit = await Produit.findById(item.produit);
      if (!produit) return res.status(404).json('error');
      if (produit.stock < item.quantite) return res.status(400).json('error');
      
      var prix = produit.enPromotion ? produit.prixPromotion : produit.prix;
      item.prixUnitaire = prix;
      montantTotal += prix * item.quantite;
    }
    
    var newCommande = new Commande({ ...req.body, montantTotal });
    var savedCommande = await newCommande.save();
    
    for (var item of req.body.produits) {
      await Produit.findByIdAndUpdate(item.produit, { $inc: { stock: -item.quantite } });
    }
    await Client.findByIdAndUpdate(req.body.client, { $push: { commandes: savedCommande._id } });
    
    res.status(201).json(savedCommande);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.updateStatut = async function(req, res) {
  try {
    var commande = await Commande.findByIdAndUpdate(
      req.params.id, 
      { statut: req.body.statut },
      { new: true }
    );
    if (!commande) return res.status(404).json('error');
    if (req.body.statut === 'livrée') {
      commande.dateLivraison = Date.now();
      await commande.save();
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.deleteCommande = async function(req, res) {
  try {
    var commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) return res.status(404).json('error');
    
    for (var item of commande.produits) {
      await Produit.findByIdAndUpdate(item.produit, { $inc: { stock: item.quantite } });
    }
    await Client.findByIdAndUpdate(commande.client, { $pull: { commandes: commande._id } });
    
    res.status(200).json('error');
  } catch (error) {
    res.status(500).json('error');
  }
};
