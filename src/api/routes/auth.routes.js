const express = require("express");
const validate = require("../../middlewares/validate");
const authenticate = require("../../middlewares/auth.middleware");
const router = express.Router();
const authController = require("../../controllers/authController");
const authSchema = require("../schemas/auth.schema");

router.post("/login", validate(authSchema.login), authController.login);
router.post("/register", validate(authSchema.register), authController.register);
router.post("/verify", validate(authSchema.verify), authController.verifyCode);
router.post("/logout", authenticate, authController.logout);

module.exports = router;
