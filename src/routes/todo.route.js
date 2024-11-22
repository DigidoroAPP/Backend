import { createTodo, getTodosByUser } from "../controllers/todo.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTodoValidator } from "../validators/todo.validator.js";
import { runValidation } from "../middlewares/validator.middleware.js";

const todoRoute = Router();

todoRoute.post(
  "/",
  authMiddleware,
  createTodoValidator,
  runValidation,
  createTodo
);

todoRoute.get("/", authMiddleware, getTodosByUser);

export default todoRoute;
