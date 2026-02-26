// @ts-nocheck
var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.controller');

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.post('/login', usersController.login);

module.exports = router;