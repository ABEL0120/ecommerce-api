const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const validate = require("../../middlewares/validate");
const authSchema = require("../schemas/auth.schema");
const authenticate = require("../../middlewares/auth.middleware");

router.post("/login", validate(authSchema.login), authController.login);
router.post("/register", validate(authSchema.register), authController.register);
router.post("/logout", authenticate, authController.logout);

module.exports = router;
