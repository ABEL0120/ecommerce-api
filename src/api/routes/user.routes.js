const express = require("express");
const validate = require("../../middlewares/validate");
const authenticate = require("../../middlewares/auth.middleware");
const userSchema = require("../schemas/user.schema");
const router = express.Router();
const userController = require("../../controllers/userController");

router.get("/", userController.getUsers);
router.get(
  "/:id",
  [authenticate, validate(userSchema.getUser)],
  userController.getUser,
);
router.put(
  "/:id",
  [authenticate, validate(userSchema.updateUser)],
  userController.updateUser,
);
router.delete(
  "/:id",
  [authenticate, validate(userSchema.deleteUser)],
  userController.deleteUser,
);

module.exports = router;
