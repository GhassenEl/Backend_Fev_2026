const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        "PROD-" +
        Date.now() +
        "-" +
        Math.random().toString(36).substr(2, 8).toUpperCase(),
    },
    nom: {
      type: String,
      required: [true, "Le nom du produit est requis"],
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
    },
    description_courte: String,
    prix: {
      type: Number,
      required: [true, "Le prix est requis"],
      min: 0,
    },
    prix_promo: {
      type: Number,
      min: 0,
    },
    categorie: {
      type: String,
      required: [true, "La catégorie est requise"],
      enum: [
        "alimentation",
        "accessoires",
        "soins",
        "jouets",
        "hygiène",
        "vêtements",
        "transport",
        "niches/cages",
        "aquariophilie",
        "autres",
      ],
    },
    sous_categorie: String,

    // Stock
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    stock_seuil_alerte: {
      type: Number,
      default: 5,
    },
    stock_illimite: {
      type: Boolean,
      default: false,
    },

    // Images
    images: [String],
    image_principale: String,

    // Animal cible
    animal_cible: [
      {
        type: String,
        enum: [
          "chien",
          "chat",
          "oiseau",
          "poisson",
          "rongeur",
          "reptile",
          "tous",
        ],
      },
    ],

    // Caractéristiques
    marque: String,
    poids_kg: Number,
    dimensions: {
      longueur: Number,
      largeur: Number,
      hauteur: Number,
    },
    couleur: String,
    matiere: String,
    origine: String,

    // Détails spécifiques selon catégorie
    details_alimentation: {
      saveur: String,
      ingredients: [String],
      analyse: {
        proteines: String,
        lipides: String,
        fibres: String,
        cendres: String,
      },
      conseils_utilisation: String,
    },

    details_soins: {
      type_produit: String,
      utilisation: String,
      precautions: String,
    },

    // Fournisseur
    fournisseur: {
      nom: String,
      reference_fournisseur: String,
      prix_achat: Number,
    },

    // Statistiques de vente
    statistiques: {
      nombre_ventes: { type: Number, default: 0 },
      note_moyenne: { type: Number, min: 0, max: 5, default: 0 },
      nombre_evaluations: { type: Number, default: 0 },
    },

    // SEO
    mots_cles: [String],
    slug: String,

    // Date de mise en ligne
    date_mise_en_ligne: {
      type: Date,
      default: Date.now,
    },
    date_retrait: Date,

    // Statut
    actif: {
      type: Boolean,
      default: true,
    },
    nouveau: {
      type: Boolean,
      default: false,
    },
    en_promotion: {
      type: Boolean,
      default: false,
    },
    meilleure_vente: {
      type: Boolean,
      default: false,
    },

    // Évaluations
    evaluations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evaluation",
      },
    ],
  },
  { timestamps: true },
);

// Middleware pour calculer le slug avant sauvegarde
produitSchema.pre("save", function (next) {
  if (this.nom && !this.slug) {
    this.slug = this.nom
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
  next();
});

module.exports = mongoose.model("Produit", produitSchema);
