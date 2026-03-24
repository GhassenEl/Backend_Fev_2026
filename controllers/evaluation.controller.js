var Evaluation = require("../models/evaluation.model");
var Livreur = require("../models/livreur.model");

exports.getEvaluations = async function (req, res) {
  try {
    var evaluations = await Evaluation.find()
      .populate("client", "nom prenom")
      .populate("produit", "nom")
      .populate("livreur", "nom prenom");
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json("error");
  }
};

exports.getEvaluationById = async function (req, res) {
  try {
    var evaluation = await Evaluation.findById(req.params.id)
      .populate("client")
      .populate("produit")
      .populate("livreur");
    if (!evaluation) return res.status(404).json("error");
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json("error");
  }
};

exports.getEvaluationsByProduit = async function (req, res) {
  try {
    var evaluations = await Evaluation.find({ produit: req.params.produitId });
    var avgNote =
      evaluations.reduce(function (acc, curr) {
        return acc + curr.note;
      }, 0) / evaluations.length;
    res
      .status(200)
      .json({ evaluations: evaluations, noteMoyenne: avgNote || 0 });
  } catch (error) {
    res.status(500).json("error");
  }
};

exports.getEvaluationsByLivreur = async function (req, res) {
  try {
    var evaluations = await Evaluation.find({ livreur: req.params.livreurId });
    var avgNote =
      evaluations.reduce(function (acc, curr) {
        return acc + curr.note;
      }, 0) / evaluations.length;
    await Livreur.findByIdAndUpdate(req.params.livreurId, {
      noteMoyenne: avgNote || 0,
    });
    res
      .status(200)
      .json({ evaluations: evaluations, noteMoyenne: avgNote || 0 });
  } catch (error) {
    res.status(500).json("error");
  }
};

exports.createEvaluation = async function (req, res) {
  try {
    req.body.client = req.user._id; // Set client to current user
    var newEvaluation = new Evaluation(req.body);
    var savedEvaluation = await newEvaluation.save();

    if (req.body.livreur) {
      var livreurEvals = await Evaluation.find({ livreur: req.body.livreur });
      var avgNote =
        livreurEvals.reduce(function (acc, curr) {
          return acc + curr.note;
        }, 0) / livreurEvals.length;
      await Livreur.findByIdAndUpdate(req.body.livreur, {
        noteMoyenne: avgNote,
      });
    }

    res.status(201).json(savedEvaluation);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

exports.updateEvaluation = async function (req, res) {
  try {
    var evaluation = await Evaluation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!evaluation) return res.status(404).json("error");
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(400).json("error");
  }
};

exports.deleteEvaluation = async function (req, res) {
  try {
    var evaluation = await Evaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) return res.status(404).json("error");
    res.status(200).json("error");
  } catch (error) {
    res.status(500).json("error");
  }
};
