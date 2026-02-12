const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes CRUD
//router.post("/", userController.createUser); //create
router.get("/a", userController.getAllUsers); //read all
//router.get("/:id", userController.getUserById); //read one
//router.put("/:id", userController.updateUser); //update
//router.delete("/:id", userController.deleteUser); //suppression
router.get('/', (req, res) => {
    res.json({ message: 'API PFE Project' });
});
module.exports = router;
