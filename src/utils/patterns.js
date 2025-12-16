/**
 * @file patterns.js
 * @description Expresiones regulares comunes para validación.
 */

const patterns = {
  // Nombre: Solo letras y espacios, min 2 chars
  NAME: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,

  // Password: Min 8 chars, 1 mayus, 1 minus, 1 numero, 1 especial
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Telefono: Digitos (10)
  PHONE: /^[0-9]{10}$/,
};

module.exports = patterns;
