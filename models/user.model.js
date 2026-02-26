var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  telephone: String,
  adresse: {
    rue: String,
    ville: String,
    codePostal: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);