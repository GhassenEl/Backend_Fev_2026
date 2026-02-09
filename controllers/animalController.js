const Animal = require("../models/Animal");

// 1. AJOUTER - Créer un nouvel animal
exports.createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json({
      success: true,
      message: "Animal ajouté avec succès",
      data: animal,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// 2. AFFICHAGE -tous les animaux
exports.getAllAnimaux = async (req, res) => {
  try {
    const animaux = await Animal.find().populate("client", "nom email");

    res.json({
      success: true,
      count: animaux.length,
      data: animaux,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 3. AFFICHAGE par ID
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate(
      "client",
      "nom email",
    );

    if (!animal) {
      return res.status(404).json({
        success: false,
        error: "Animal non trouvé",
      });
    }

    res.json({
      success: true,
      data: animal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 4. AFFICHAGE - Récupérer les animaux
exports.getAnimauxByClient = async (req, res) => {
  try {
    const animaux = await Animal.find({ client: req.params.clientId }).populate(
      "client",
      "nom email",
    );

    res.json({
      success: true,
      count: animaux.length,
      data: animaux,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 5. UPDATE - Mettre à jour un animal
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("client", "nom email");

    if (!animal) {
      return res.status(404).json({
        success: false,
        error: "Animal non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Animal mis à jour avec succès",
      data: animal,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// 6. SUPPRESSION - Supprimer un animal
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        error: "Animal non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Animal supprimé avec succès",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
