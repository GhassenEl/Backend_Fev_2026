const Evaluation = require("../models/Evaluation");

// 1.CREATE
exports.createEvaluation = async (req, res) => {
  try {
    const evaluation = new Evaluation(req.body);
    await evaluation.save();
    res.status(201).json({
      success: true,
      message: "Évaluation créée",
      data: evaluation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// 2.READ ALL
exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate("client", "nom")
      .populate("livreur", "nom");

    res.json({
      success: true,
      count: evaluations.length,
      data: evaluations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// READ ONE
exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
      .populate("client", "nom email")
      .populate("livreur", "nom telephone");

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        error: "Évaluation non trouvée",
      });
    }

    res.json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//3. UPDATE
exports.updateEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        error: "Évaluation non trouvée",
      });
    }

    res.json({
      success: true,
      message: "Évaluation mise à jour",
      data: evaluation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// 4.DELETE
exports.deleteEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndDelete(req.params.id);

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        error: "Évaluation non trouvée",
      });
    }

    res.json({
      success: true,
      message: "Évaluation supprimée",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
