const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
// Importer les routes
const commandeRoutes = require("./src/routes/commandeRoutes");
const evaluationRoutes = require("./src/routes/evaluationRoutes");
const livreurRoutes = require("./src/routes/livreurRoutes");
const panierRoutes = require("./src/routes/panierRoutes");
const produitRoutes = require("./src/routes/produitRoutes");
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pfe_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connecté à MongoDB"))
  .catch((err) => console.error(" Erreur de connexion:", err));

// Ajouter les routes
app.use("/api/commandes", commandeRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/livreurs", livreurRoutes);
app.use("/api/paniers", panierRoutes);
app.use("/api/produits", produitRoutes);
// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "API PFE Project - Backend Fev 2026",
    status: "running",
    version: "1.0.0",
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(` Serveur démarré sur le port ${PORT}`);
  console.log(` URL: http://localhost:${PORT}`);
});
