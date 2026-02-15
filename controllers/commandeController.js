const commandeModel = require("../models/commande.model");

module.exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await commandeModel.find();
    if (commandes.length === 0) {
      throw new Error("No commandes found");
    }
    res
      .status(200)
      .json({ message: "Commandes retrieved successfully", data: commandes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getCommandeById = async (req, res) => {
  try {
    const commandeId = req.params.id;

    const commande = await commandeModel.findById(commandeId);
    if (!commande) {
      throw new Error("Commande not found");
    }
    res
      .status(200)
      .json({ message: "Commande retrieved successfully", data: commande });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createCommande = async (req, res) => {
  try {
    const { client_id, date_commande, statut, total, produits } = req.body;
    const newCommande = new commandeModel({
      client_id,
      date_commande,
      statut,
      total,
      produits,
    });
    await newCommande.save();
    res
      .status(201)
      .json({ message: "Commande created successfully", data: newCommande });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateCommande = async (req, res) => {
  try {
    const commandeId = req.params.id;
    const { statut, total, produits } = req.body;
    const updatedCommande = await commandeModel.findByIdAndUpdate(
      commandeId,
      { statut, total, produits },
      { new: true },
    );
    if (!updatedCommande) {
      throw new Error("Commande not found");
    }
    res
      .status(200)
      .json({
        message: "Commande updated successfully",
        data: updatedCommande,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteCommande = async (req, res) => {
  try {
    const commandeId = req.params.id;
    const deletedCommande = await commandeModel.findByIdAndDelete(commandeId);
    if (!deletedCommande) {
      throw new Error("Commande not found");
    }
    res
      .status(200)
      .json({
        message: "Commande deleted successfully",
        data: deletedCommande,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
