var mongoose = require('mongoose');

var produitSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  categorie: { 
    type: String, 
    required: true, 
    enum: ['alimentation', 'accessoires', 'soins', 'jouets', 'hygiène'] 
  },
  image: { type: String, default: 'default.jpg' },
  animalCible: { type: String, enum: ['chien', 'chat', 'oiseau', 'poisson', 'rongeur', 'tous'] },
  enPromotion: { type: Boolean, default: false },
  prixPromotion: { type: Number, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Produit', produitSchema);