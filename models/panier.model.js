var mongoose = require('mongoose');

var panierSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true, unique: true },
  produits: [{
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
    quantite: { type: Number, required: true, min: 1, default: 1 }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Panier', panierSchema);