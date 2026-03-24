// @ts-nocheck
var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users.controller");

// Public routes
router.post("/login", usersController.login);
router.post("/register", usersController.createUser); // Assuming register is public

module.exports = router;
