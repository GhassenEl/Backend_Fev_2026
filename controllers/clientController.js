const Client = require("../models/Client");
const User = require("../models/User");

// Créer un client avec son utilisateur
exports.createClient = async (req, res) => {
  try {
    // Créer d'abord l'utilisateur
    const user = new User({
      nom: req.body.nom,
      email: req.body.email,
      role: "client",
    });
    await user.save();

    // Créer le client
    const client = new Client({
      user: user._id,
      fidelite: req.body.fidelite || 0,
    });
    await client.save();

    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire tous les clients avec leurs utilisateurs
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("user");
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
