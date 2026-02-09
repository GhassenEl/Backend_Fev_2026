const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Le nom du produit est requis"],
    trim: true,
  },
  prix: {
    type: Number,
    required: [true, "Le prix est requis"],
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  categorie: {
    type: String,
    enum: ["nourriture", "jouet", "accessoire", "soin", "autre"],
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Produit", produitSchema);
