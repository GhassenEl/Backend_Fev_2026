const Client = require("../models/Client");

// 1. AJOUTER client
exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. AFFICHER TOUS les clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// AFFICHER UN client by id
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Non trouvé" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//3. MODIFIER un client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!client) {
      return res.status(404).json({ error: "Non trouvé" });
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 4. SUPPRIMER client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Non trouvé" });
    }
    res.json({ message: "Supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// affichage des clients
exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate("animaux");
    if (!client) {
      return res.status(404).json({ error: "Non trouvé" });
    }
    res.json(client.animaux);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
