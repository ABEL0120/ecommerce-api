const authService = require("../services/authService");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.json({
      status: true,
      data: user,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.json({
      status: true,
      data: user,
    });
  } catch (error) {
    console.error("Error registering:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  login,
  register,
};
