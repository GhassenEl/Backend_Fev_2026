var Client = require("../models/client.model");
var Animal = require("../models/animal.model");

exports.getClients = async function (req, res) {
  try {
    var clients = await Client.find().populate("animaux");
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json("error");
  }
};

exports.getClientById = async function (req, res) {
  try {
    if (
      req.user.role !== "admin" &&
      req.params.id !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }
    var client = await Client.findById(req.params.id).populate(
      "animaux commandes",
    );
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getClientWithAnimaux = async function (req, res) {
  try {
    var client = await Client.findById(req.params.id).populate("animaux");
    if (!client) return res.status(404).json("error");
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json("error");
  }
};

exports.createClient = async function (req, res) {
  try {
    var newClient = new Client(req.body);
    var savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json("error");
  }
};

exports.updateClient = async function (req, res) {
  try {
    if (
      req.user.role !== "admin" &&
      req.params.id !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }
    var client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

exports.deleteClient = async function (req, res) {
  try {
    if (
      req.user.role !== "admin" &&
      req.params.id !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }
    var client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    await Animal.deleteMany({ proprietaire: client._id });
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
