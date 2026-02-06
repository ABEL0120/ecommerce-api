const userService = require("../services/userService");
const response = require("../utils/response");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return response.success(res, users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return response.error(res, "Error interno del servidor");
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUser(userId);    
    return response.success(res, user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return response.error(res, "Error interno del servidor");
  }
};

const updateUser = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await userService.updateUser(userId, req.body);
    return response.success(res, user);
  }catch(error){
    console.error("Error al actualizar usuario:", error);
    return response.error(res, "Error interno del servidor");
  }
};

const deleteUser = async (req, res) => {
  return response.error(res, "Not implemented yet", 501);
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
