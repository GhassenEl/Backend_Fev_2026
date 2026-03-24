var Animal = require("../models/animal.model");
var Client = require("../models/client.model");

exports.getAnimaux = async function (req, res) {
  try {
    var animaux = await Animal.find().populate("proprietaire", "nom prenom");
    res.status(200).json(animaux);
  } catch (error) {
    res.status(500).json("error");
  }
};

exports.getAnimalById = async function (req, res) {
  try {
    var animal = await Animal.findById(req.params.id).populate("proprietaire");
    if (!animal) return res.status(404).json("error");
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json("error");
  }
};

exports.getAnimauxByProprietaire = async function (req, res) {
  try {
    if (
      req.user.role !== "admin" &&
      req.params.clientId !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }
    var animaux = await Animal.find({ proprietaire: req.params.clientId });
    res.status(200).json(animaux);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createAnimal = async function (req, res) {
  try {
    req.body.proprietaire = req.user._id; // Set owner to current user
    var newAnimal = new Animal(req.body);
    var savedAnimal = await newAnimal.save();
    await Client.findByIdAndUpdate(req.user._id, {
      $push: { animaux: savedAnimal._id },
    });
    res.status(201).json(savedAnimal);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

exports.updateAnimal = async function (req, res) {
  try {
    var animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    if (
      req.user.role !== "admin" &&
      animal.proprietaire.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }
    animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

exports.deleteAnimal = async function (req, res) {
  try {
    var animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    if (
      req.user.role !== "admin" &&
      animal.proprietaire.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }
    await Animal.findByIdAndDelete(req.params.id);
    await Client.findByIdAndUpdate(animal.proprietaire, {
      $pull: { animaux: animal._id },
    });
    res.status(200).json({ message: "Animal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
