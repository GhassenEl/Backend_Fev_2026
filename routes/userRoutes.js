const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes CRUD
router.post('/getAllUsers', userController.createUser); //create
//pour tester
router.get('/a', async (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'All users retrieved successfully' });
}); //read all
router.get('/:id', userController.getUserById); //read one
router.put('/:id', userController.updateUser); //update
router.delete('/:id', userController.deleteUser); //suppression

module.exports = router;
