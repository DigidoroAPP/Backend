import { errorCodes } from "../utils/errors/error.code.js";
import * as userReposiry from "../repositories/user.repository.js";
import { ServiceError } from "../errors/servise.error.js";
import { createToken } from "../utils/jwt.util.js";

export const register = async (user) => {
  try {
    const existUser = await userReposiry.findUserByEmail(user.email);
    if (existUser)
      throw new ServiceError(
        "user exists ",
        errorCodes.AUTH.USER_ALREADY_EXISTS
      );

    const newUser = await userReposiry.createUser(user);
    return newUser;
  } catch (e) {
    throw new ServiceError(
      "Register error",
      e.code || errorCodes.AUTH.FAILD_TO_CREATE_USER
    );
  }
};

export const login = async (email, password) => {
  try {
    const existUser = await userReposiry.findUserByEmail(email);

    if (!existUser || !(await existUser.comparePassword(password)))
      throw new ServiceError(
        "Invalid credentials",
        errorCodes.AUTH.INVALID_CREDENTIALS
      );

    const token = createToken({
      id: existUser._id
    });
    if (!token)
      throw new ServiceError(
        "Token creation error",
        errorCodes.AUTH.FAILD_CREATE_TOKEN
      );
    await userReposiry.addToken(existUser._id, token.token);

    return token;
  } catch (e) {
    throw new ServiceError(
      "Login error",
      e.code || errorCodes.AUTH.FAILD_TO_LOGIN
    );
  }
};

export const logout = async (userId) => {
  try {
    await userReposiry.deleteToken(userId);
    return "Logout success";
  } catch (e) {
    throw new ServiceError(
      "Logout error",
      e.code || errorCodes.AUTH.FAILD_TO_LOGOUT
    );
  }
};
