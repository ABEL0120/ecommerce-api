const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

// Auth Routes
router.use("/auth", authRoutes);

// User Routes
router.use("/users", userRoutes);

module.exports = router;
