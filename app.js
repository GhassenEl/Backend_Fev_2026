// Importation des modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Configuration
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Middleware
app.use(cors()); // Permet les requêtes cross-origin
app.use(express.json()); // Pour parser le JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les formulaires

// Configuration du port
const PORT = process.env.PORT || 3002;

// Connexion à MongoDB (optionnel - à décommenter si vous utilisez MongoDB)
/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/monprojet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion MongoDB:', err));
*/

// Routes de base
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur mon API",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Route de test
app.get("/api/test", (req, res) => {
  res.json({
    message: "Route de test fonctionne!",
    data: [1, 2, 3, 4, 5],
  });
});

// Route avec paramètre
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `Utilisateur ${userId} trouvé`,
    user: {
      id: userId,
      name: `Utilisateur ${userId}`,
      email: `user${userId}@example.com`,
    },
  });
});

// Route POST
app.post("/api/users", (req, res) => {
  const userData = req.body;
  console.log("Données reçues:", userData);

  res.status(201).json({
    message: "Utilisateur créé avec succès",
    user: userData,
    id: Math.floor(Math.random() * 1000),
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route non trouvée",
    path: req.originalUrl,
  });
});

// Gestion des erreurs serveur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Erreur serveur",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Démarrage du serveur avec gestion des erreurs de port
const server = app
  .listen(PORT)
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`❌ Le port ${PORT} est déjà utilisé.`);
      console.log(
        `💡 Essayez de changer le port dans le fichier .env ou utilisez un autre port.`,
      );
      console.log(`👉 Suggestions: PORT=3001, 3002, 3003, 8080`);
      process.exit(1);
    } else {
      console.error("Erreur serveur:", err);
    }
  })
  .on("listening", () => {
    console.log(`✅ Serveur démarré avec succès!`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📝 Routes disponibles:`);
    console.log(`   - GET  http://localhost:${PORT}/`);
    console.log(`   - GET  http://localhost:${PORT}/api/test`);
    console.log(`   - GET  http://localhost:${PORT}/api/users/123`);
    console.log(`   - POST http://localhost:${PORT}/api/users`);
    console.log(`🛑 Arrêter: Ctrl+C`);
  });

// Gestion propre de l'arrêt
process.on("SIGINT", () => {
  console.log("\n🛑 Arrêt du serveur...");
  server.close(() => {
    console.log("✅ Serveur arrêté");
    process.exit(0);
  });
});

module.exports = app;
