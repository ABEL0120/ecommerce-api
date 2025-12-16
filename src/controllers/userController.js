const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  getUsers,
};
