const authService = require("../services/authService");
const response = require("../utils/response");

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return response.success(
      res,
      result,
      "Login successful, check your email for the code"
    );
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

const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    await authService.logout(userId);
    return response.success(res, null, "Logout successful");
  } catch (error) {
    console.error("Error logging out:", error);
    return response.error(res, error.message || "Internal server error", 500);
  }
};

const verifyCode = async (req, res) => {
  try {
    const { userId, code } = req.body;
    const result = await authService.verifyCode({ userId, code });
    return response.success(res, result, "Code verified successfully");
  } catch (error) {
    console.error("Error verifying code:", error);
    return response.error(res, error.message || "Internal server error", 500);
  }
};

module.exports = {
  login,
  register,
  logout,
  verifyCode,
};
