var User = require('../models/user.model');
var bcrypt = require('bcryptjs');

exports.getUsers = async function(req, res) {
  try {
    var users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.getUserById = async function(req, res) {
  try {
    var user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json('error');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.createUser = async function(req, res) {
  try {
    var { email, password } = req.body;
    var existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json('error');
    
    var hashedPassword = await bcrypt.hash(password, 10);
    var newUser = new User({ ...req.body, password: hashedPassword });
    var savedUser = await newUser.save();
    var userResponse = savedUser.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.updateUser = async function(req, res) {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    var user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json('error');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json('error');
  }
};

exports.deleteUser = async function(req, res) {
  try {
    var user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json('error');
    res.status(200).json('error');
  } catch (error) {
    res.status(500).json('error');
  }
};

exports.login = async function(req, res) {
  try {
    var { email, password } = req.body;
    var user = await User.findOne({ email });
    if (!user) return res.status(401).json('error');
    
    var isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json('error');
    
    var userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json('error');
  }
};