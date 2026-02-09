const Livreur = require("../models/Livreur");
const User = require("../models/User");

// 1.CREATE
exports.createLivreur = async (req, res) => {
  try {
    // Créer l'utilisateur
    const user = new User({
      nom: req.body.nom,
      email: req.body.email,
      password: req.body.password,
      role: "livreur",
    });
    await user.save();

    // Créer le livreur
    const livreur = new Livreur({
      user: user._id,
      disponible:
        req.body.disponible !== undefined ? req.body.disponible : true,
      note: req.body.note || 0,
      telephone: req.body.telephone,
      vehicule: req.body.vehicule,
    });
    await livreur.save();

    const livreurWithUser = await Livreur.findById(livreur._id).populate(
      "user",
      "nom email role",
    );

    res.status(201).json({
      success: true,
      message: "Livreur ajouté",
      data: livreurWithUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// 2.READ ALL
exports.getAllLivreurs = async (req, res) => {
  try {
    const livreurs = await Livreur.find()
      .populate("user", "nom email")
      .populate("commandes", "statut total");

    res.json({
      success: true,
      count: livreurs.length,
      data: livreurs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// READ ONE
exports.getLivreurById = async (req, res) => {
  try {
    const livreur = await Livreur.findById(req.params.id)
      .populate("user", "nom email telephone")
      .populate("commandes")
      .populate("evaluations");

    if (!livreur) {
      return res.status(404).json({
        success: false,
        error: "Livreur non trouvé",
      });
    }

    res.json({
      success: true,
      data: livreur,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 3.UPDATE
exports.updateLivreur = async (req, res) => {
  try {
    const livreur = await Livreur.findById(req.params.id);

    if (!livreur) {
      return res.status(404).json({
        success: false,
        error: "Livreur non trouvé",
      });
    }

    // Mettre à jour l'utilisateur si nécessaire
    if (req.body.nom || req.body.email) {
      await User.findByIdAndUpdate(
        livreur.user,
        {
          nom: req.body.nom,
          email: req.body.email,
        },
        { new: true, runValidators: true },
      );
    }

    const updatedLivreur = await Livreur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).populate("user", "nom email");

    res.json({
      success: true,
      message: "Livreur mis à jour",
      data: updatedLivreur,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// 4.DELETE
exports.deleteLivreur = async (req, res) => {
  try {
    const livreur = await Livreur.findById(req.params.id);

    if (!livreur) {
      return res.status(404).json({
        success: false,
        error: "Livreur non trouvé",
      });
    }

    // Supprimer l'utilisateur associé
    await User.findByIdAndDelete(livreur.user);

    // Supprimer le livreur
    await livreur.deleteOne();

    res.json({
      success: true,
      message: "Livreur supprimé",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
