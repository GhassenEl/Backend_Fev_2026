const mongoose = require("mongoose");
const User = require("./User");

const livreurSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  note: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  commandes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commande",
    },
  ],
  evaluations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
    },
  ],
});

module.exports = mongoose.model("Livreur", livreurSchema);
