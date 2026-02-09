const Animal = require("../models/Animal");
const Client = require("../models/Client");

// Créer un animal
exports.createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();

    // Ajouter l'animal au client
    await Client.findByIdAndUpdate(req.body.client, {
      $push: { animaux: animal._id },
    });

    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire tous les animaux
exports.getAllAnimaux = async (req, res) => {
  try {
    const animaux = await Animal.find().populate("client");
    res.json(animaux);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire les animaux d'un client
exports.getAnimauxByClient = async (req, res) => {
  try {
    const animaux = await Animal.find({ client: req.params.clientId });
    res.json(animaux);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
