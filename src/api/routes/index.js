const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const authController = require("../../controllers/authController");

// Auth
router.post("/login", authController.login);
router.post("/register", authController.register);

// Users
router.get("/users", userController.getUsers);

module.exports = router;
