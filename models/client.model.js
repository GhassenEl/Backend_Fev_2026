var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  adresse: {
    rue: String,
    ville: String,
    codePostal: String
  },
  animaux: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
  commandes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commande' }]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);