const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const panierSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
    unique: true,
  },
  items: [itemSchema],
  total: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Panier", panierSchema);
