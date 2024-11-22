import { verifyToken } from "../utils/jwt.util";
import createHttpError from "http-errors";
import { getTokenUser } from "../services/user.service";
import { config } from "../configs/config";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) next(createHttpError(401, "Unauthorized"));

    const [prefix, token] = authorization.split(" ");

    if (prefix !== config.prefix) next(createHttpError(401, "Unauthorized"));
    if (!token) next(createHttpError(401, "Unauthorized"));

    const payload = verifyToken(token);
    if (!payload) next(createHttpError(401, "Unauthorized"));

    const compareToken = await getTokenUser(payload.id);
    if (!compareToken)
      return next(createHttpError(401, "User not found or logged out"));
    if (compareToken !== token)
      return next(createHttpError(401, "Invalid token"));

    req.user = payload;
    req.token = token;
    next();
  } catch (e) {
    next(createHttpError(401, "Unauthorized"));
  }
};
