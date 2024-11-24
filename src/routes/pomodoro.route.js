import {
  patchTodosInPomodorosController,
  getPomodoroByUser,

} from "../controllers/pomodoro.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const pomodoroRoute = Router();

// pomodoroRoute.get("/", getAllPomodoros);
// pomodoroRoute.get(":id", getPomodoroById);
pomodoroRoute.get("/user",authMiddleware, getPomodoroByUser); //TODO: This route needs to implement authMiddleware
pomodoroRoute.patch("/:id", patchTodosInPomodorosController);
// pomodoroRoute.put("/:id", updatePomodoro);
// pomodoroRoute.delete("/:id", deletePomodoro);
// pomodoroRoute.patch("/todo/:id", patchTodoInPomodoro);
// pomodoroRoute.patch("/state/:id", patchStatePomodoro);

export default pomodoroRoute;