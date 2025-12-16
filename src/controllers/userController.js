const userService = require("../services/userService");
const response = require("../utils/response");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return response.success(res, users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return response.error(res, "Internal server error");
  }
};

const getUser = async (req, res) => {
  return response.error(res, "Not implemented yet", 501);
};

const createUser = async (req, res) => {
  return response.error(res, "Not implemented yet", 501);
};

const updateUser = async (req, res) => {
  return response.error(res, "Not implemented yet", 501);
};

const deleteUser = async (req, res) => {
  return response.error(res, "Not implemented yet", 501);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
