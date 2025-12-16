const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const validate = require("../../middlewares/validate");
const authSchema = require("../schemas/auth.schema");

router.post("/login", validate(authSchema.login), authController.login);
router.post("/register", validate(authSchema.register), authController.register);

module.exports = router;
