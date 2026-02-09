const mongoose = require("mongoose");
const User = require("./User");

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fidelite: {
    type: Number,
    default: 0,
    min: 0,
  },
  animaux: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
    },
  ],
  evaluations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
    },
  ],
});

module.exports = mongoose.model("Client", clientSchema);
