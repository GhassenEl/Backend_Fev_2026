const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom est requis"],
    },
    espece: {
      type: String,
      required: [true, "L'espèce est requise"],
      enum: [
        "chien", "chat",
        "oiseau","poisson",
        "rongeur","lapin",
        "autre",
      ],
    },
    race: String,
    age: {
      type: Number,
      min: 0,
      max: 50,
    },
    poids: {
      type: Number,
      min: 0,
    },
    proprietaire_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    animal_image: String,

    // Informations médicales
    numero_puce: {
      type: String,
      unique: true,
      sparse: true,
    },
    date_naissance: Date,
    couleur: String,
    sterilise: {
      type: Boolean,
      default: false,
    },
    allergies: [String],
    vaccins: [
      {
        nom: String,
        date: Date,
        rappel: Date,
      },
    ],

    // Comportement
    comportement: {
      type: String,
      enum: ["calme", "agité", "timide", "agressif", "joueur"],
    },
    sociabilite: {
      chiens: { type: String, enum: ["bonne", "moyenne", "mauvaise"] },
      chats: { type: String, enum: ["bonne", "moyenne", "mauvaise"] },
      enfants: { type: String, enum: ["bonne", "moyenne", "mauvaise"] },
    },

    // Régime alimentaire
    regime_alimentaire: {
      type_nourriture: String,
      frequence: String,
      quantite: String,
      restrictions: [String],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Animal", animalSchema);
