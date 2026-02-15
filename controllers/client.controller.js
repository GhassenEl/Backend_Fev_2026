const clientModel = require("../models/client.model");

module.exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientModel.find();
    if (clients.length === 0) {
      throw new Error("No clients found");
    }
    res
      .status(200)
      .json({ message: "Clients retrieved successfully", data: clients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getClientById = async (req, res) => {
  try {
    const clientId = req.params.id;

    const client = await clientModel.findById(clientId);
    if (!client) {
      throw new Error("Client not found");
    }
    res
      .status(200)
      .json({ message: "Client retrieved successfully", data: client });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createClient = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse, date_inscription } =
      req.body;
    const newClient = new clientModel({
      nom,
      prenom,
      email,
      telephone,
      adresse,
      date_inscription,
    });
    await newClient.save();
    res
      .status(201)
      .json({ message: "Client created successfully", data: newClient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const { nom, prenom, email, telephone, adresse } = req.body;
    const updatedClient = await clientModel.findByIdAndUpdate(
      clientId,
      { nom, prenom, email, telephone, adresse },
      { new: true },
    );
    if (!updatedClient) {
      throw new Error("Client not found");
    }
    res
      .status(200)
      .json({ message: "Client updated successfully", data: updatedClient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const deletedClient = await clientModel.findByIdAndDelete(clientId);
    if (!deletedClient) {
      throw new Error("Client not found");
    }
    res
      .status(200)
      .json({ message: "Client deleted successfully", data: deletedClient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
