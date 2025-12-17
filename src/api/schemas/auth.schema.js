const Joi = require("joi");
const patterns = require("../../utils/patterns");

const register = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe ser válido",
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string().pattern(patterns.PASSWORD).required().messages({
    "string.pattern.base":
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
    "any.required": "La contraseña es obligatoria",
  }),
  name: Joi.string().pattern(patterns.NAME).required().messages({
    "string.pattern.base": "El nombre solo puede contener letras y espacios",
    "any.required": "El nombre es obligatorio",
  }),
});

const login = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string().required().messages({
    "any.required": "La contraseña es obligatoria",
  }),
});

const verify = Joi.object({
  userId: Joi.string().required().messages({
    "any.required": "El userId es obligatorio",
  }),
  code: Joi.string().required().messages({
    "any.required": "El código es obligatorio",
  }),
});

module.exports = {
  register,
  login,
  verify,
};
