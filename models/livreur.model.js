const mongoose = require("mongoose");

const livreurSchema = new mongoose.Schema(
  {
    matricule: {
      type: String,
      required: true,
      unique: true,
    },
    nom: {
      type: String,
      required: [true, "Le nom est requis"],
    },
    prenom: {
      type: String,
      required: [true, "Le prénom est requis"],
    },
    telephone: {
      type: String,
      required: [true, "Le téléphone est requis"],
      unique: true,
    },
    telephone_secondaire: String,
    email: {
      type: String,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Veuillez fournir un email valide"],
    },

    // Informations personnelles
    date_naissance: Date,
    adresse: {
      rue: String,
      ville: String,
      code_postal: String,
      pays: { type: String, default: "France" },
    },
    photo: String,

    // Véhicule
    vehicule: {
      type: {
        type: String,
        enum: ["scooter", "moto", "voiture", "camion"],
        required: true,
      },
      marque: String,
      modele: String,
      immatriculation: String,
      couleur: String,
      assurance: {
        compagnie: String,
        numero: String,
        date_expiration: Date,
      },
    },

    // Zone de livraison
    zone_livraison: {
      ville: String,
      code_postaux: [String],
      rayon_km: Number,
    },

    // Disponibilité
    disponible: {
      type: Boolean,
      default: true,
    },
    horaires_travail: {
      lundi: { debut: String, fin: String },
      mardi: { debut: String, fin: String },
      mercredi: { debut: String, fin: String },
      jeudi: { debut: String, fin: String },
      vendredi: { debut: String, fin: String },
      samedi: { debut: String, fin: String },
      dimanche: { debut: String, fin: String },
    },

    // Statistiques de livraison
    statistiques: {
      total_livraisons: { type: Number, default: 0 },
      livraisons_aujourdhui: { type: Number, default: 0 },
      note_moyenne: { type: Number, min: 0, max: 5, default: 0 },
      retards: { type: Number, default: 0 },
      incidents: { type: Number, default: 0 },
    },

    // Contrat
    date_embauche: {
      type: Date,
      default: Date.now,
    },
    type_contrat: {
      type: String,
      enum: ["CDI", "CDD", "freelance", "stagiaire"],
      default: "CDI",
    },
    salaire: Number,

    // Documents
    documents: [
      {
        type: { type: String, enum: ["permis", "carte_identite", "assurance"] },
        fichier: String,
        date_expiration: Date,
      },
    ],

    // Évaluations
    evaluations: [
      {
        client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
        note: { type: Number, min: 0, max: 5 },
        commentaire: String,
        date: { type: Date, default: Date.now },
      },
    ],

    // Status
    actif: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Livreur", livreurSchema);
