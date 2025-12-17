const response = require("../utils/response");
const tokenService = require("../services/tokenService");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return response.error(res, "No token provided", 401);
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      return response.error(res, "Token error", 401);
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return response.error(res, "Token malformatted", 401);
    }
    const decoded = tokenService.verifyAccessToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    return response.error(res, "Invalid token", 401);
  }
};

module.exports = authenticate;
