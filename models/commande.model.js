const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
  {
    numero_commande: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        "CMD-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
    },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    date_commande: {
      type: Date,
      default: Date.now,
      required: true,
    },
    statut: {
      type: String,
      enum: [
        "en_attente",
        "confirmée",
        "en_préparation",
        "expédiée",
        "livrée",
        "annulée",
        "remboursée",
      ],
      default: "en_attente",
    },
    produits: [
      {
        produit_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produit",
          required: true,
        },
        quantite: {
          type: Number,
          required: true,
          min: 1,
        },
        prix_unitaire: {
          type: Number,
          required: true,
        },
        nom_produit: String,
        remise: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
      },
    ],
    total_ht: {
      type: Number,
      required: true,
      min: 0,
    },
    tva: {
      type: Number,
      default: 20,
    },
    total_ttc: {
      type: Number,
      required: true,
      min: 0,
    },

    // Livraison
    adresse_livraison: {
      rue: String,
      ville: String,
      code_postal: String,
      pays: String,
      instructions: String,
    },
    livreur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livreur",
    },
    frais_livraison: {
      type: Number,
      default: 0,
    },
    date_livraison_prevue: Date,
    date_livraison_reelle: Date,

    // Paiement
    paiement: {
      methode: {
        type: String,
        enum: ["carte", "paypal", "virement", "espèces"],
      },
      statut: {
        type: String,
        enum: ["en_attente", "payé", "échoué", "remboursé"],
        default: "en_attente",
      },
      transaction_id: String,
      date_paiement: Date,
    },

    // Remises
    code_promo: String,
    remise_totale: {
      type: Number,
      default: 0,
    },

    notes: String,
  },
  { timestamps: true },
);

// Middleware pour calculer le total TTC avant sauvegarde
commandeSchema.pre("save", function (next) {
  if (this.total_ht && this.tva) {
    this.total_ttc = this.total_ht * (1 + this.tva / 100);
  }
  next();
});

module.exports = mongoose.model("Commande", commandeSchema);
