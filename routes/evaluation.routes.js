var express = require("express");
var router = express.Router();
const evaluationController = require("../controllers/evaluation.controller");
const upload = require("../middlewares/uploadfile");
const logMiddleware = require("../middlewares/LogMiddleware");

/* GET all evaluations */
router.get(
  "/GetAllEvaluations",
  logMiddleware,
  evaluationController.getAllEvaluations,
);

/* GET evaluation by ID */
router.get("/GetEvaluationById/:id", evaluationController.getEvaluationById);

/* GET evaluations by product ID */
router.get(
  "/GetEvaluationsByProduit/:produitId",
  evaluationController.getEvaluationsByProduit,
);

/* GET evaluations by client ID */
router.get(
  "/GetEvaluationsByClient/:clientId",
  evaluationController.getEvaluationsByClient,
);

/* POST create evaluation */
router.post("/CreateEvaluation", evaluationController.createEvaluation);

/* POST create evaluation with photos */
router.post(
  "/CreateEvaluationWithPhotos",
  upload.array("photos", 5),
  logMiddleware,
  evaluationController.createEvaluationWithPhotos,
);

/* PUT update evaluation */
router.put("/UpdateEvaluation/:id", evaluationController.updateEvaluation);

/* PUT like evaluation */
router.put("/LikeEvaluation/:id", evaluationController.likeEvaluation);

/* PUT dislike evaluation */
router.put("/DislikeEvaluation/:id", evaluationController.dislikeEvaluation);

/* PUT respond to evaluation */
router.put(
  "/RespondToEvaluation/:id",
  evaluationController.respondToEvaluation,
);

/* DELETE evaluation */
router.delete("/DeleteEvaluation/:id", evaluationController.deleteEvaluation);

module.exports = router;
