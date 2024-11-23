import { getUserByIdController, getAllUsersController } from "../controllers/user.controller.js";
import { idParamValidator } from "../validators/user.validator.js";
import { runValidation } from "../middlewares/validator.middleware.js";
import { Router } from "express";

const userRoute = Router();

userRoute.get("/", getAllUsersController);
userRoute.get("/:userId",idParamValidator, runValidation,  getUserByIdController);

export default userRoute;