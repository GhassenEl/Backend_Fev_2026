var mongoose = require('mongoose');

var animalSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  espece: { type: String, required: true, enum: ['chien', 'chat', 'oiseau', 'poisson', 'rongeur', 'autre'] },
  race: String,
  age: Number,
  poids: Number,
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Animal', animalSchema);