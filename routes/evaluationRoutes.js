const express = require("express");
const router = express.Router();
const evaluationController = require("../controllers/evaluationController");
// Routes CRUD
router.post("/", evaluationController.createEvaluation); // create
router.get("/", evaluationController.getAllEvaluations); // READ ALL
router.get("/:id", evaluationController.getEvaluationById); // READ ONE
router.put("/:id", evaluationController.updateEvaluation); // UPDATE
router.delete("/:id", evaluationController.deleteEvaluation); // DELETE

module.exports = router;
