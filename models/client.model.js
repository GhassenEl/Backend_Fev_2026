const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom est requis"],
    },
    prenom: {
      type: String,
      required: [true, "Le prénom est requis"],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Veuillez fournir un email valide"],
    },
    telephone: {
      type: String,
      required: [true, "Le téléphone est requis"],
      match: [
        /^[0-9+\-\s]{10,}$/,
        "Veuillez fournir un numéro de téléphone valide",
      ],
    },
    adresse: {
      rue: String,
      ville: String,
      code_postal: String,
      pays: { type: String, default: "France" },
    },
    date_inscription: {
      type: Date,
      default: Date.now,
    },

    // Informations supplémentaires
    date_naissance: Date,
    profession: String,
    preferences_communication: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      telephone: { type: Boolean, default: false },
    },

    // Fidélité
    points_fidelite: {
      type: Number,
      default: 0,
    },
    carte_fidelite: String,

    // Animaux
    animaux: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
      },
    ],

    // Commandes
    commandes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commande",
      },
    ],

    // Méthodes de paiement préférées
    methodes_paiement: [
      {
        type: { type: String, enum: ["carteBancaire", "paypal", "virement","Stripe"] },
        details: String,
        par_defaut: { type: Boolean, default: false },
      },
    ],

    // Statut
    actif: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Client", clientSchema);
