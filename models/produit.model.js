const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    description: String,
    prix: { type: Number, required: true },
    categorie: String,
    image: { type: String }, // URL de l'image principale
    images: [{ type: String }], // Plusieurs images
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    disponible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Produit", produitSchema);
