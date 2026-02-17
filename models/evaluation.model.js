const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },

    // Une seule de ces références sera remplie
    commande: { type: mongoose.Schema.Types.ObjectId, ref: "Commande" },
    produit: { type: mongoose.Schema.Types.ObjectId, ref: "Produit" },
    livreur: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    note: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    titre: {
      type: String,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    commentaire: {
      type: String,
      required: [true, "Comment is required"],
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },

    images: [String],

    // Utilité
    utile: { type: Number, default: 0 },
    utilisateursUtiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Réponse du vendeur/livreur
    reponse: {
      contenu: String,
      date: Date,
      auteur: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },

    // Signalements
    signale: { type: Boolean, default: false },
    motifsSignalement: [String],

    // Modération
    approuve: { type: Boolean, default: true },
    moderePar: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dateModeration: Date,
  },
  { timestamps: true },
);

// Validation pour s'assurer qu'une seule entité est évaluée
evaluationSchema.pre("validate", function (next) {
  const references = [this.commande, this.produit, this.livreur].filter(
    (ref) => ref != null,
  );

  if (references.length !== 1) {
    next(
      new Error(
        "Une évaluation doit concerner exactement une entité (commande, produit ou livreur)",
      ),
    );
  }

  // Vérifier que le livreur a bien le rôle livreur
  if (this.livreur) {
    mongoose
      .model("User")
      .findById(this.livreur)
      .then((user) => {
        if (user && user.role !== "livreur") {
          next(new Error("L'utilisateur évalué doit être un livreur"));
        }
      })
      .catch(next);
  }

  next();
});

// Mettre à jour la note moyenne du produit après sauvegarde
evaluationSchema.post("save", async function () {
  if (this.produit) {
    const Produit = mongoose.model("Produit");
    const produit = await Produit.findById(this.produit);
    if (produit) {
      await produit.calculerNoteMoyenne();
    }
  }
});

module.exports = mongoose.model("Evaluation", evaluationSchema);
