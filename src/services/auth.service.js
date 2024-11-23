import mongoose from "mongoose";
import { errorCodes } from "../utils/errors/error.code.js";
import * as userReposiry from "../repositories/user.repository.js";
import { ServiceError } from "../errors/servise.error.js";
import { createToken } from "../utils/jwt.util.js";
import { createPomodoro } from "./pomodoro.service.js";
import { addPomodoroUser } from "./user.service.js";

export const register = async (user) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    const newUser = await userReposiry.createUser(user, opts);
    console.log("final ", opts);
    const pomodor = await createPomodoro({ id_user: newUser._id }, opts);

     await addPomodoroUser(newUser._id, pomodor._id, opts);

    await session.commitTransaction();

    return newUser;
  } catch (e) {

    await session.abortTransaction();
    throw new ServiceError(
      "Register error",
      e.code || errorCodes.AUTH.FAILD_TO_CREATE_USER
    );
  } finally {
    await session.endSession();
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
