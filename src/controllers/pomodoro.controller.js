import createHttpError from "http-errors";
import * as PomodoroService from "../services/pomodoro.service.js";

import { errorCodes } from "../utils/errors/error.code.js";

export const getPomodoroById = async (req, res, next) => {
  try {
    const pomodoroId = req.params.id;
    const pomodoro = await PomodoroService.getPomodoroById(pomodoroId);
    res.status(200).send(pomodoro);
  } catch (e) {
    switch (e.code) {
      case errorCodes.POMODORO.POMODORO_NOT_FOUND:
        next(createHttpError(404, "Pomodoro not found"));
        break;
      case errorCodes.POMODORO.POMODORO_FECH_FAIL:
        next(createHttpError(500, "Get pomodoro error"));
        break;
      default:
        next(e);
    }
  }
};

export const getPomodoroByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const pomodoros = await PomodoroService.getPomodoroByUser(userId);

    res.status(200).send(pomodoros);
  } catch (e) {
    next(createHttpError(500, "Get pomodoros by user error"));
  }
};

export const patchTodosInPomodorosController = async (req, res, next) => {
  try {
    const pomodoroId = req.params.id;
    const todos = req.body;

    const pomodoro = await PomodoroService.patchTodosInPomodoros(pomodoroId, todos);
    res.status(200).send(pomodoro);
  } catch (e) {
    switch (e.code) {
      case errorCodes.POMODORO.POMODORO_NOT_FOUND:
        next(createHttpError(404, "Pomodoro not found"));
        break;
      case errorCodes.POMODORO.FAILD_TO_ADD_TODO:
        next(createHttpError(500, "Patch todo in pomodoro error"));
        break;
      default:
        next(e);
    }
  }
}

// export const getAllPomodoros = async (req, res, next) => {
//   try {
//     const pomodoros = await PomodoroService.getAllPomodoros();
//     res.status(200).send(pomodoros);
//   } catch (e) {
//     next(createHttpError(500, "Get all pomodoros error"));
//   }
// };



// export const updatePomodoro = async (req, res, next) => {
//   try {
//     const pomodoroId = req.params.id;
//     const data = req.body;
//     const pomodoro = await PomodoroService.updatePomodoro(pomodoroId, data);
//     res.status(200).send(pomodoro);
//   } catch (e) {
//     switch (e.code) {
//       case errorCodes.POMODORO.POMODORO_NOT_FOUND:
//         next(createHttpError(404, "Pomodoro not found"));
//         break;
//       case errorCodes.POMODORO.FAILD_TO_UPDATE_POMODORO:
//         next(createHttpError(500, "Update pomodoro error"));
//         break;
//       default:
//         next(e);
//     }
//   }
// };

// export const deletePomodoro = async (req, res, next) => {
//   try {
//     const pomodoroId = req.params.id;
//     const pomodoro = await PomodoroService.deletePomodoro(pomodoroId);
//     res.status(200).send(pomodoro);
//   } catch (e) {
//     switch (e.code) {
//       case errorCodes.POMODORO.POMODORO_NOT_FOUND:
//         next(createHttpError(404, "Pomodoro not found"));
//         break;
//       case errorCodes.POMODORO.FAILD_TO_DELETE_POMODORO:
//         next(createHttpError(500, "Delete pomodoro error"));
//         break;
//       default:
//         next(e);
//     }
//   }
// };

// export const patchTodoInPomodoro = async (req, res, next) => {
//   try {
//     const pomodoroId = req.params.id;
//     const todoId = req.body.todoId;
//     const pomodoro = await PomodoroService.addTodoInPomodoro(
//       pomodoroId,
//       todoId
//     );
//     res.status(200).send(pomodoro);
//   } catch (e) {
//     switch (e.code) {
//       case errorCodes.POMODORO.POMODORO_NOT_FOUND:
//         next(createHttpError(404, "Pomodoro not found"));
//         break;
//       case errorCodes.POMODORO.FAILD_TO_ADD_TODO:
//         next(createHttpError(500, "Patch todo in pomodoro error"));
//         break;
//       default:
//         next(e);
//     }
//   }
// };

// export const patchStatePomodoro = async (req, res, next) => {
//   try {
//     const pomodoroId = req.params.id;
//     const state = req.body.state;
//     const pomodoro = await PomodoroService.patchStatePomodoro(
//       pomodoroId,
//       state
//     );
//     res.status(200).send(pomodoro);
//   } catch (e) {
//     switch (e.code) {
//       case errorCodes.POMODORO.POMODORO_NOT_FOUND:
//         next(createHttpError(404, "Pomodoro not found"));
//         break;
//       case errorCodes.POMODORO.FAILD_TO_UPDATE_POMODORO:
//         next(createHttpError(500, "Patch state in pomodoro error"));
//         break;
//       default:
//         next(e);
//     }
//   }
// };
