import { verifyToken } from "../utils/jwt.util.js";
import createHttpError from "http-errors";
import { getTokenUser, getUserById } from "../services/user.service.js";
import { config } from "../configs/config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) next(createHttpError(401, "Unauthorized"));

    const [prefix, token] = authorization.split(" ");

    if (prefix !== config.prefix) next(createHttpError(401, "Invalid prefix"));
    if (!token) next(createHttpError(401, "Unauthorized"));

    const payload = verifyToken(token);
    if (!payload) next(createHttpError(401, "Unauthorized"));

    const user = await getUserById(payload.id);
    if (!user) next(createHttpError(401, "User not found"));

    const compareToken = await getTokenUser(payload.id);
    if (!compareToken)
      return next(createHttpError(401, "User not found or logged out"));
    if (compareToken.token !== token)
      return next(createHttpError(401, "Invalid token"));

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    next(createHttpError(401, "Unauthorized"));
  }
};

export const rolesMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const user = await getUserById(req.user.id);
      if (!user) return next(createHttpError(401, "User not found"));

      if (!requiredRoles.some(role => user.roles.includes(role))) 
        return next(createHttpError(403, "Forbidden"));
      
      next();
    } catch (error) {
      next(error);
    }
  };
}