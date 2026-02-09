const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  note: {
    type: Number,
    required: [true, "the rate is required"],
    min: 1,
    max: 5,
  },
  commentaire: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  livreur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livreur",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Evaluation", evaluationSchema);
