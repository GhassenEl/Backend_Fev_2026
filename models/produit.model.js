const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    prix: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    prixPromo: {
      type: Number,
      min: [0, "Promo price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    categorie: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "nourriture",
        "jouets",
        "accessoires",
        "soins",
        "habitats",
        "vêtements",
        "autre",
      ],
    },
    sousCategorie: String,
    marque: String,
    images: [String],

    // Caractéristiques
    poids: Number,
    dimensions: {
      longueur: Number,
      largeur: Number,
      hauteur: Number,
      unite: { type: String, default: "cm" },
    },

    // Pour quels animaux
    animauxCompatibles: [
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

    // Fourchette d'âge recommandée
    ageMin: { type: Number, min: 0 },
    ageMax: { type: Number, max: 50 },

    // Relations
    evaluations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evaluation" }],

    // Statistiques
    noteMoyenne: { type: Number, default: 0, min: 0, max: 5 },
    nombreEvaluations: { type: Number, default: 0 },
    ventes: { type: Number, default: 0 },

    // Disponibilité
    enVente: { type: Boolean, default: true },
    dateAjout: { type: Date, default: Date.now },

    // Fournisseur
    fournisseur: String,
    paysOrigine: String,
  },
  { timestamps: true },
);

// Middleware pour calculer la note moyenne
produitSchema.methods.calculerNoteMoyenne = async function () {
  const Evaluation = mongoose.model("Evaluation");
  const evaluations = await Evaluation.find({ produit: this._id });

  if (evaluations.length > 0) {
    const somme = evaluations.reduce((acc, ev) => acc + ev.note, 0);
    this.noteMoyenne = somme / evaluations.length;
    this.nombreEvaluations = evaluations.length;
  } else {
    this.noteMoyenne = 0;
    this.nombreEvaluations = 0;
  }

  await this.save();
};

module.exports = mongoose.model("Produit", produitSchema);
