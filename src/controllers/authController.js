const authService = require("../services/authService");
const response = require("../utils/response");

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return response.success(
      res,
      result,
      "Login exitoso, verifique su correo electrónico para el código"
    );
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return response.error(
      res,
      error.message || "Error interno del servidor",
      500
    );
  }
};

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return response.success(res, user, "Registro exitoso", 201);
  } catch (error) {
    console.error("Error al registrar:", error);
    return response.error(
      res,
      error.message || "Error interno del servidor",
      500
    );
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    await authService.logout(userId);
    return response.success(res, null, "Cierre de sesión exitoso");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return response.error(
      res,
      error.message || "Error interno del servidor",
      500
    );
  }
};

const verifyCode = async (req, res) => {
  try {
    const { userId, code } = req.body;
    const result = await authService.verifyCode({ userId, code });
    return response.success(res, result, "Código verificado exitosamente");
  } catch (error) {
    console.error("Error al verificar código:", error);
    return response.error(
      res,
      error.message || "Error interno del servidor",
      500
    );
  }
};

module.exports = {
  login,
  register,
  logout,
  verifyCode,
};
