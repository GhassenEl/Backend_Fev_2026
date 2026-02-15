const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    produit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produit",
      required: true,
    },
    commande_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commande",
    },
    note: {
      type: Number,
      required: [true, "La note est requise"],
      min: 0,
      max: 5,
    },
    commentaire: {
      type: String,
      maxlength: 1000,
    },
    date_evaluation: {
      type: Date,
      default: Date.now,
    },

    // Critères détaillés
    criteres: {
      qualite_prix: { type: Number, min: 0, max: 5 },
      service_client: { type: Number, min: 0, max: 5 },
      delai_livraison: { type: Number, min: 0, max: 5 },
      emballage: { type: Number, min: 0, max: 5 },
    },

    // Photos
    photos: [String],

    // Utilité
    utile_pour: {
      type: String,
      enum: ["tous", "débutants", "experts", "chiots", "chats"],
    },

    // Modération
    verifie: {
      type: Boolean,
      default: false,
    },
    signale: {
      type: Boolean,
      default: false,
    },
    motif_signalement: String,

    // Réponse du vendeur
    reponse_vendeur: {
      commentaire: String,
      date: Date,
    },

    // Likes
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Index composé pour éviter les doublons (un client ne peut évaluer qu'une fois un produit)
evaluationSchema.index({ client_id: 1, produit_id: 1 }, { unique: true });

module.exports = mongoose.model("Evaluation", evaluationSchema);
