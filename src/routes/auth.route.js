import { loginController, logoutController, registerController, meController } from "../controllers/auth.controller.js";
import { Router } from "express";
import { runValidation } from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {registerValidator, loginValidator} from "../validators/auth.validator.js";

const authRoute = Router();


authRoute.post("/register", registerValidator, runValidation, registerController);
authRoute.post("/login", loginValidator, runValidation, loginController);
authRoute.post("/logout", logoutController);
authRoute.get("/me", authMiddleware, meController);

export default authRoute;

