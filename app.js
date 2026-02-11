const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes
const userRoutes = require('./routes/userRoutes');

//imports 8altin sala7hom

// const clientRoutes = require('./src/routes/clientRoutes');
// const animalRoutes = require('./src/routes/animalRoutes');
// const evaluationRoutes = require('./src/routes/evaluationRoutes');
// const livreurRoutes = require('./src/routes/livreurRoutes');
// const panierRoutes = require('./src/routes/panierRoutes');
// const commandeRoutes = require('./src/routes/commandeRoutes');
// const produitRoutes = require('./src/routes/produitRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pfe_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(' Connecté à MongoDB'))
  .catch((err) => console.error(' Erreur de connexion:', err));

// Routes API
app.use('/users', userRoutes);

// app.use('/api/clients', clientRoutes);
// app.use('/api/animaux', animalRoutes);
// app.use('/api/evaluations', evaluationRoutes);
// app.use('/api/livreurs', livreurRoutes);
// app.use('/api/paniers', panierRoutes);
// app.use('/api/commandes', commandeRoutes);
// app.use('/api/produits', produitRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API PFE Project' });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur' });
});

app.listen(PORT, () => {
  console.log(` Serveur démarré sur le port ${PORT}`);
});
