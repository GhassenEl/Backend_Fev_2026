var mongoose = require('mongoose');

var commandeSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  produits: [{
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
    quantite: { type: Number, required: true, min: 1 },
    prixUnitaire: Number
  }],
  livreur: { type: mongoose.Schema.Types.ObjectId, ref: 'Livreur' },
  dateCommande: { type: Date, default: Date.now },
  dateLivraison: Date,
  statut: { 
    type: String, 
    enum: ['en attente', 'confirmée', 'en livraison', 'livrée', 'annulée'],
    default: 'en attente'
  },
  montantTotal: { type: Number, required: true },
  adresseLivraison: {
    rue: String,
    ville: String,
    codePostal: String
  },
  modePaiement: { type: String, enum: ['espèces', 'carte', 'virement'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Commande', commandeSchema);