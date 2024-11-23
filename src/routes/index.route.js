import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import todoRoute from "./todo.route.js"
import { Router } from "express";


const routes = Router();

routes.use("/auth", authRoute);
routes.use("/user", userRoute);
routes.use("/todo", todoRoute);
export default routes;