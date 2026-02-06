const Joi = require("joi");
const patterns = require("../../utils/patterns");

const getUser = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "El id es requerido",
  }),
});

const updateUser = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "El id es requerido",
  }),
  name: Joi.string().pattern(patterns.NAME).required().messages({
    "string.pattern.base": "El nombre solo puede contener letras y espacios",
    "any.required": "El nombre es requerido",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "El correo electrónico es requerido",
    "string.email": "El correo electrónico debe ser válido",
  }),
  password: Joi.string().pattern(patterns.PASSWORD).required().messages({
    "string.pattern.base":
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
    "any.required": "La contraseña es requerida",
  }),
});

const deleteUser = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "El id es requerido",
  }),
});

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
