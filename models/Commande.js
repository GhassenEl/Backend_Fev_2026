const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  livreur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livreur",
  },
  panier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Panier",
    required: true,
  },
  statut: {
    type: String,
    enum: [
      "en attente",
      "confirmée",
      "en préparation",
      "en livraison",
      "livrée",
      "annulée",
    ],
    default: "en attente",
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  adresseLivraison: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Commande", commandeSchema);
