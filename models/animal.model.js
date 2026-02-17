const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Animal name is required"],
    },
    espece: {
      type: String,
      required: [true, "Species is required"],
      enum: [
        "chien",
        "chat",
        "oiseau",
        "poisson",
        "rongeur",
        "reptile",
        "autre",
      ],
    },
    race: String,
    age: { type: Number, min: 0, max: 50 },
    poids: Number,
    couleur: String,
    dateNaissance: Date,
    sexe: {
      type: String,
      enum: ["male", "femelle", "inconnu"],
      default: "inconnu",
    },
    sterilise: { type: Boolean, default: false },
    puceElectronique: String,
    tatouage: String,
    photo: String,

    // Allergies et restrictions
    allergies: [String],
    regimeSpecial: String,

    // Relations
    proprietaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },

    // Produits recommandés ou achetés pour cet animal
    produitsAchetes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produit" }],
    produitsFavoris: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produit" }],

    // Suivi vétérinaire
    veterinaire: String,
    derniereVisite: Date,
    vaccinations: [
      {
        nom: String,
        date: Date,
        rappel: Date,
      },
    ],

    // Notes
    notes: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Animal", animalSchema);
