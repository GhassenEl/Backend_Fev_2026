const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "the name of animal is required"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "the name of type of the animal is required"],
    enum: ["chien", "chat", "oiseau", "rongeur", "reptile", "rat","autre"],
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Animal", animalSchema);
