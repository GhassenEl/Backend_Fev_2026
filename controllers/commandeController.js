const Commande = require("../models/Commande");

// 1.CREATE
exports.createCommande = async (req, res) => {
  try {
    const commande = new Commande(req.body);
    await commande.save();
    res.status(201).json({
      success: true,
      message: "Commande créée",
      data: commande,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// 2. READ ALL
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate("client", "nom email")
      .populate("livreur", "nom disponible")
      .populate("panier", "items total");

    res.json({
      success: true,
      count: commandes.length,
      data: commandes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// READ ONE
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate("client", "nom email telephone")
      .populate("livreur", "nom telephone")
      .populate("panier");

    if (!commande) {
      return res.status(404).json({
        success: false,
        error: "Commande non trouvée",
      });
    }

    res.json({
      success: true,
      data: commande,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 3. UPDATE
exports.updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!commande) {
      return res.status(404).json({
        success: false,
        error: "Commande non trouvée",
      });
    }

    res.json({
      success: true,
      message: "Commande mise à jour",
      data: commande,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// 4. DELETE
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);

    if (!commande) {
      return res.status(404).json({
        success: false,
        error: "Commande non trouvée",
      });
    }

    res.json({
      success: true,
      message: "Commande supprimée",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
