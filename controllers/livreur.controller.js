const livreurModel = require("../models/livreur.model");

module.exports.getAllLivreurs = async (req, res) => {
  try {
    const livreurs = await livreurModel.find();
    if (livreurs.length === 0) {
      throw new Error("No livreurs found");
    }
    res
      .status(200)
      .json({ message: "Livreurs retrieved successfully", data: livreurs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getLivreurById = async (req, res) => {
  try {
    const livreurId = req.params.id;

    const livreur = await livreurModel.findById(livreurId);
    if (!livreur) {
      throw new Error("Livreur not found");
    }
    res
      .status(200)
      .json({ message: "Livreur retrieved successfully", data: livreur });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createLivreur = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      telephone,
      email,
      vehicule,
      zone_livraison,
      disponible,
    } = req.body;
    const newLivreur = new livreurModel({
      nom,
      prenom,
      telephone,
      email,
      vehicule,
      zone_livraison,
      disponible,
    });
    await newLivreur.save();
    res
      .status(201)
      .json({ message: "Livreur created successfully", data: newLivreur });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateLivreur = async (req, res) => {
  try {
    const livreurId = req.params.id;
    const {
      nom,
      prenom,
      telephone,
      email,
      vehicule,
      zone_livraison,
      disponible,
    } = req.body;
    const updatedLivreur = await livreurModel.findByIdAndUpdate(
      livreurId,
      { nom, prenom, telephone, email, vehicule, zone_livraison, disponible },
      { new: true },
    );
    if (!updatedLivreur) {
      throw new Error("Livreur not found");
    }
    res
      .status(200)
      .json({ message: "Livreur updated successfully", data: updatedLivreur });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteLivreur = async (req, res) => {
  try {
    const livreurId = req.params.id;
    const deletedLivreur = await livreurModel.findByIdAndDelete(livreurId);
    if (!deletedLivreur) {
      throw new Error("Livreur not found");
    }
    res
      .status(200)
      .json({ message: "Livreur deleted successfully", data: deletedLivreur });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
