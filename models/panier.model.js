const mongoose = require("mongoose");

const articlePanierSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    default: 1,
  },
  prixUnitaire: {
    type: Number,
    required: true,
  },
  dateAjout: {
    type: Date,
    default: Date.now,
  },
});

const panierSchema = new mongoose.Schema(
  {
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    articles: [articlePanierSchema],

    totaux: {
      sousTotal: { type: Number, default: 0 },
      fraisLivraison: { type: Number, default: 0 },
      taxes: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },

    codePromo: String,
    reduction: { type: Number, default: 0 },

    statut: {
      type: String,
      enum: ["actif", "abandonne", "converti", "expire"],
      default: "actif",
    },

    // Relation avec commande
    commande: { type: mongoose.Schema.Types.ObjectId, ref: "Commande" },

    dateExpiration: {
      type: Date,
      default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000), // 7 jours
    },

    // Adresse de livraison temporaire
    adresseLivraison: {
      rue: String,
      ville: String,
      codePostal: String,
      pays: String,
      instructions: String,
    },
  },
  { timestamps: true },
);

// Middleware pour calculer les totaux avant sauvegarde
panierSchema.pre("save", async function (next) {
  if (this.articles.length > 0) {
    await this.populate("articles.produit");

    let sousTotal = 0;
    for (const article of this.articles) {
      sousTotal += article.prixUnitaire * article.quantite;
    }

    this.totaux.sousTotal = sousTotal;
    this.totaux.total =
      sousTotal +
      this.totaux.fraisLivraison +
      this.totaux.taxes -
      this.reduction;
  }
  next();
});

module.exports = mongoose.model("Panier", panierSchema);
