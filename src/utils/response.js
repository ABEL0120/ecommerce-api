/**
 * @file response.js
 * @description Helper para estandarizar las respuestas de la API.
 * Garantiza que todas las respuestas tengan una estructura consistente: { success, message, data/errors }
 */

const createResponse = (res, statusCode, success, message, payload = {}) => {
  return res.status(statusCode).json({
    success,
    message,
    ...payload,
  });
};

/**
 * Envia una respuesta exitosa (2xx).
 * @param {Object} res - Objeto response de Express
 * @param {any} data - Datos a devolver
 * @param {string} message - Mensaje opcional
 * @param {number} statusCode - Código HTTP (default 200)
 */
exports.success = (
  res,
  data,
  message = "Operation successful",
  statusCode = 200
) => {
  return createResponse(res, statusCode, true, message, { data });
};

/**
 * Envia una respuesta de error (4xx, 5xx).
 * Útil para capturar errores operacionales conocidos.
 * @param {Object} res - Objeto response de Express
 * @param {string} message - Mensaje de error
 * @param {number} statusCode - Código HTTP (default 500)
 * @param {any} errors - Detalles adicionales del error (ej. validaciones)
 */
exports.error = (
  res,
  message = "Internal Server Error",
  statusCode = 500,
  errors = null
) => {
  const payload = errors ? { errors } : {};
  return createResponse(res, statusCode, false, message, payload);
};

/**
 * Envia una respuesta de error de validación (400) específicamente.
 * @param {Object} res - Objeto response de Express
 * @param {any} errors - Lista o objeto de errores de validación
 */
exports.validation = (res, errors) => {
  return createResponse(res, 400, false, "Validation Error", { errors });
};
