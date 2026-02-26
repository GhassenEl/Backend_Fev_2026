var mongoose = require('mongoose');

var livreurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  vehicule: {
    type: { type: String, enum: ['moto', 'voiture', 'vélo'] },
    immatriculation: String
  },
  zoneLivraison: [String],
  disponible: { type: Boolean, default: true },
  commandes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commande' }],
  noteMoyenne: { type: Number, default: 0, min: 0, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Livreur', livreurSchema);
