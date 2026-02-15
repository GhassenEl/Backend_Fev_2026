const evaluationModel = require("../models/evaluation.model");

module.exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await evaluationModel.find();
    if (evaluations.length === 0) {
      throw new Error("No evaluations found");
    }
    res
      .status(200)
      .json({
        message: "Evaluations retrieved successfully",
        data: evaluations,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getEvaluationById = async (req, res) => {
  try {
    const evaluationId = req.params.id;

    const evaluation = await evaluationModel.findById(evaluationId);
    if (!evaluation) {
      throw new Error("Evaluation not found");
    }
    res
      .status(200)
      .json({ message: "Evaluation retrieved successfully", data: evaluation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createEvaluation = async (req, res) => {
  try {
    const { client_id, produit_id, note, commentaire, date_evaluation } =
      req.body;
    const newEvaluation = new evaluationModel({
      client_id,
      produit_id,
      note,
      commentaire,
      date_evaluation,
    });
    await newEvaluation.save();
    res
      .status(201)
      .json({
        message: "Evaluation created successfully",
        data: newEvaluation,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateEvaluation = async (req, res) => {
  try {
    const evaluationId = req.params.id;
    const { note, commentaire } = req.body;
    const updatedEvaluation = await evaluationModel.findByIdAndUpdate(
      evaluationId,
      { note, commentaire },
      { new: true },
    );
    if (!updatedEvaluation) {
      throw new Error("Evaluation not found");
    }
    res
      .status(200)
      .json({
        message: "Evaluation updated successfully",
        data: updatedEvaluation,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteEvaluation = async (req, res) => {
  try {
    const evaluationId = req.params.id;
    const deletedEvaluation =
      await evaluationModel.findByIdAndDelete(evaluationId);
    if (!deletedEvaluation) {
      throw new Error("Evaluation not found");
    }
    res
      .status(200)
      .json({
        message: "Evaluation deleted successfully",
        data: deletedEvaluation,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
