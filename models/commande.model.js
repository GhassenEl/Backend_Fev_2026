const mongoose = require("mongoose");

const articleCommandeSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  prixUnitaire: {
    type: Number,
    required: true,
  },
  nomProduit: String,
  imageProduit: String,
});

const commandeSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Client is required"],
    },
    panier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Panier",
      required: true,
    },
    articles: [articleCommandeSchema],

    livreur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    evaluation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
    },

    numeroCommande: {
      type: String,
      unique: true,
      required: true,
    },

    statut: {
      type: String,
      enum: [
        "en_attente",
        "confirmee",
        "preparation",
        "expediee",
        "en_livraison",
        "livree",
        "annulee",
        "remboursee",
        "probleme",
      ],
      default: "en_attente",
    },

    // Paiement
    paiement: {
      methode: {
        type: String,
        enum: ["carte", "paypal", "virement", "livraison", "autre"],
        required: true,
      },
      statut: {
        type: String,
        enum: ["en_attente", "paye", "echoue", "rembourse"],
        default: "en_attente",
      },
      transactionId: String,
      datePaiement: Date,
    },

    // Montants
    montants: {
      sousTotal: { type: Number, required: true },
      fraisLivraison: { type: Number, default: 0 },
      taxes: { type: Number, default: 0 },
      reduction: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },

    codePromo: String,

    // Livraison
    livraison: {
      adresse: {
        rue: { type: String, required: true },
        ville: { type: String, required: true },
        codePostal: { type: String, required: true },
        pays: { type: String, default: "France" },
        instructions: String,
      },
      dateEstimee: Date,
      dateLivraison: Date,
      signature: String,
      photoLivraison: String,
    },

    // Historique des statuts
    historiqueStatuts: [
      {
        statut: String,
        date: { type: Date, default: Date.now },
        commentaire: String,
        misAJourPar: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],

    notes: String,

    // Facture
    factureGeneree: { type: Boolean, default: false },
    urlFacture: String,
  },
  { timestamps: true },
);

// Générer un numéro de commande unique avant la sauvegarde
commandeSchema.pre("save", async function (next) {
  if (!this.numeroCommande) {
    const date = new Date();
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, "0");
    const jour = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    this.numeroCommande = `CMD-${annee}${mois}${jour}-${random}`;
  }

  // Ajouter à l'historique des statuts si le statut change
  if (this.isModified("statut")) {
    this.historiqueStatuts.push({
      statut: this.statut,
      date: new Date(),
    });
  }

  next();
});

module.exports = mongoose.model("Commande", commandeSchema);
