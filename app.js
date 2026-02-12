const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const animalRoutes = require('./routes/animalRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const livreurRoutes = require('./routes/');
const panierRoutes = require('./routes/panierRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const produitRoutes = require('./routes/produitRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pfe_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(' Connecté à MongoDB'))
.catch(err => console.error(' Erreur de connexion:', err));

// Routes API
app.use('/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/animaux', animalRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/livreurs', livreurRoutes);
app.use('/api/paniers', panierRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/produits', produitRoutes);

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API PFE Project' });
});


// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur serveur' });
});

app.listen(process.env.PORT, () => {
    console.log(` Serveur démarré sur le port ${PORT}`);
});
