const response = require("../utils/response");

/**
 * Middleware para validar el body de la petición contra un esquema Joi.
 * @param {Object} schema - Esquema de Joi
 */
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return response.validation(res, errorDetails);
  }

  next();
};

module.exports = validate;
