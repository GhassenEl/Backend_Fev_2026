const express = require("express");
const router = express.Router();
const evaluationController = require("../controllers/evaluation.controller");
const upload = require("../config/upload.config");

// Upload de photos pour l'évaluation
router.post(
  "/evaluations",
  upload.evaluation.array("photos", 3), // Max 3 photos
  evaluationController.createEvaluation,
);

router.put(
  "/evaluations/:id",
  upload.evaluation.array("photos", 3),
  evaluationController.updateEvaluation,
);

router.get("/evaluations", evaluationController.getAllEvaluations);
router.get("/evaluations/:id", evaluationController.getEvaluationById);
router.delete("/evaluations/:id", evaluationController.deleteEvaluation);

module.exports = router;
