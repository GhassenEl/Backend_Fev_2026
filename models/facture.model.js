const mongoose = require("mongoose");

const factureSchema = new mongoose.Schema(
  {
    numeroFacture: {
      type: String,
      required: true,
      unique: true,
    },

    commande: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commande",
      required: true,
      unique: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Informations de facturation
    informationsClient: {
      nom: String,
      email: String,
      adresse: {
        rue: String,
        ville: String,
        codePostal: String,
        pays: String,
      },
      tel: String,
    },

    articles: [
      {
        produit: { type: mongoose.Schema.Types.ObjectId, ref: "Produit" },
        nom: String,
        quantite: Number,
        prixUnitaire: Number,
        totalHT: Number,
        tauxTVA: { type: Number, default: 20 },
        totalTTC: Number,
      },
    ],

    montants: {
      totalHT: { type: Number, required: true },
      totalTVA: { type: Number, required: true },
      totalTTC: { type: Number, required: true },
      reduction: { type: Number, default: 0 },
      fraisLivraisonHT: Number,
      fraisLivraisonTTC: Number,
      netAPayer: { type: Number, required: true },
    },

    // Paiement
    paiement: {
      methode: String,
      transactionId: String,
      datePaiement: Date,
      statut: String,
    },

    // Dates
    dateEmission: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dateEcheance: Date,
    datePaiement: Date,

    // Statut
    statut: {
      type: String,
      enum: ["emise", "payee", "en_attente", "annulee", "remboursee"],
      default: "emise",
    },

    // Fichier PDF
    pdfGenere: { type: Boolean, default: false },
    urlPdf: String,

    // Mentions légales
    mentionsLegales: {
      siret: String,
      tvaIntracommunautaire: String,
      conditions: String,
    },

    notes: String,
  },
  { timestamps: true },
);

// Générer un numéro de facture unique
factureSchema.pre("save", async function (next) {
  if (!this.numeroFacture) {
    const date = new Date();
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, "0");

    // Compter les factures du mois pour générer un numéro séquentiel
    const count = await mongoose.model("Facture").countDocuments({
      dateEmission: {
        $gte: new Date(annee, mois - 1, 1),
        $lt: new Date(annee, mois, 1),
      },
    });

    const sequence = String(count + 1).padStart(4, "0");
    this.numeroFacture = `FAC-${annee}${mois}-${sequence}`;
  }

  // Calculer les montants si nécessaire
  if (this.articles && this.articles.length > 0) {
    let totalHT = 0;
    let totalTVA = 0;

    for (const article of this.articles) {
      const tva = (article.prixUnitaire * article.tauxTVA) / 100;
      article.totalHT = article.prixUnitaire * article.quantite;
      article.totalTTC = article.totalHT + tva * article.quantite;

      totalHT += article.totalHT;
      totalTVA += tva * article.quantite;
    }

    this.montants.totalHT = totalHT;
    this.montants.totalTVA = totalTVA;
    this.montants.totalTTC = totalHT + totalTVA;
    this.montants.netAPayer =
      this.montants.totalTTC -
      this.montants.reduction +
      (this.montants.fraisLivraisonTTC || 0);
  }

  next();
});

module.exports = mongoose.model("Facture", factureSchema);
