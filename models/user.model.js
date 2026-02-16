const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
      ],
    },
    age: { type: Number, min: 20, max: 80 },
    role: {
      type: String,
      enum: ["admin", "user", "moderateur", "client", "livreur"],
      default: "user",
    },
    location: String,
    user_image: String,

    //champs role admin
    tel: Number,

    // Nouveaux champs pour les relations avec les autres tables
    // En tant que client
    panier: { type: mongoose.Schema.Types.ObjectId, ref: "Panier" },
    commandes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Commande" }],
    evaluations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evaluation" }],
    animaux: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animal" }],

    // En tant que livreur
    livraisons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Commande" }],
    evaluationsRecues: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Evaluation" },
    ],
    vehicule: String,
    disponible: { type: Boolean, default: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  } catch (err) {
    throw err;
  }
});

module.exports = mongoose.model("User", userSchema);
