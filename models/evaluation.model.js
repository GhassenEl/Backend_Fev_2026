var mongoose = require('mongoose');

var evaluationSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  commande: { type: mongoose.Schema.Types.ObjectId, ref: 'Commande', required: true },
  produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
  livreur: { type: mongoose.Schema.Types.ObjectId, ref: 'Livreur' },
  note: { type: Number, required: true, min: 1, max: 5 },
  commentaire: { type: String, maxlength: 500 },
  dateEvaluation: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);
