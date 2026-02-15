const mongoose = require("mongoose");

const panierSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      unique: true,
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
          default: 1,
        },
        prix_unitaire: {
          type: Number,
          required: true,
        },
        nom_produit: String,
        image_produit: String,
        date_ajout: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Code promo
    code_promo: {
      code: String,
      remise: Number,
      type_remise: {
        type: String,
        enum: ["pourcentage", "montant_fixe"],
      },
    },

    // Statut du panier
    statut: {
      type: String,
      enum: ["actif", "abandonné", "converti", "expiré"],
      default: "actif",
    },

    // Date d'expiration (pour nettoyage automatique)
    date_expiration: {
      type: Date,
      default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000), // 7 jours
    },

    // Dernière activité
    derniere_activite: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Middleware pour calculer le total avant sauvegarde
panierSchema.pre("save", function (next) {
  if (this.produits && this.produits.length > 0) {
    let total = 0;
    this.produits.forEach((produit) => {
      total += produit.prix_unitaire * produit.quantite;
    });

    // Appliquer la remise si un code promo est présent
    if (this.code_promo && this.code_promo.remise) {
      if (this.code_promo.type_remise === "pourcentage") {
        total = total * (1 - this.code_promo.remise / 100);
      } else if (this.code_promo.type_remise === "montant_fixe") {
        total = Math.max(0, total - this.code_promo.remise);
      }
    }

    this.total = total;
  }
  next();
});

// Mettre à jour derniere_activite à chaque modification
panierSchema.pre("findOneAndUpdate", function () {
  this.set({ derniere_activite: new Date() });
});

module.exports = mongoose.model("Panier", panierSchema);
