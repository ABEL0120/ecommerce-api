const authService = require("../services/authService");
const response = require("../utils/response");

const login = async (req, res) => {
  try {
    const user = await authService.login(req.body);
    return response.success(res, user, "Login successful");
  } catch (error) {
    console.error("Error logging in:", error);
    return response.error(res, error.message || "Internal server error", 500);
  }
};

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return response.success(res, user, "Registration successful", 201);
  } catch (error) {
    console.error("Error registering:", error);
    return response.error(res, error.message || "Internal server error", 500);
  }
};

module.exports = {
  login,
  register,
};
