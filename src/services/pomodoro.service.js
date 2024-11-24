import { ServiceError } from "../errors/servise.error.js";
import mongoose from "mongoose";
import { errorCodes } from "../utils/errors/error.code.js";
import * as pomodoroRepository from "../repositories/pomodor.repository.js";
import { addPomodoroInTodo, deletePomodoroInTodo } from "./todo.service.js";
import { assignPomodoroState } from "../utils/PomodoroStateHandler.util.js";

export const createPomodoro = async (pomodoro, opts) => {
  try {
    const newPomodoro = await pomodoroRepository.createPomodoro(pomodoro, opts);
    return newPomodoro;
  } catch (e) {
    throw new ServiceError(
      "Create pomodoro error",
      e.code || errorCodes.POMODORO.CREATE_POMODORO_FAIL
    );
  }
};

export const getPomodoroByUser = async (userId) => {
  try {
    const pomodoros = await pomodoroRepository.getPomodoroByUser(userId);
    return pomodoros;
  } catch (e) {
    throw new ServiceError(
      "Get pomodoros by user error",
      e.code || errorCodes.POMODORO.FAILD_TO_GET_POMODOROS_BY_USER
    );
  }
};

export const patchTodosInPomodoros = async (pomodoroId, todos) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    let updatePomo;

    const pomodoro = await pomodoroRepository.getPomodoroById(pomodoroId);
    if (!pomodoro)
      throw new ServiceError(
        "Pomodoro no encontrado",
        errorCodes.POMODORO.POMODORO_NOT_FOUND
      );
    for (const todo of todos.id_todos) {
      if (pomodoro.id_todos.includes(todo)) {
        updatePomo = await pomodoroRepository.removeTodo(
          pomodoroId,
          todo,
          opts
        );
        await deletePomodoroInTodo(todo, pomodoroId, opts);
      } else {
        updatePomo = await pomodoroRepository.addTodo(pomodoroId, todo, opts);
        await addPomodoroInTodo(todo, pomodoroId, opts);
      }
    }
    await session.commitTransaction();
    return updatePomo;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      "Add todos to pomodoro error",
      e.code || errorCodes.POMODORO.FAILD_TO_ADD_TODO
    );
  } finally {
    await session.endSession();
  }
};

export const patchPomodoroStanteAndTime = async (userId, state, time) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    const userPomodoro = await pomodoroRepository.getPomodoroByUser(userId);

    if (!userPomodoro || userPomodoro.length < 1)
      throw new ServiceError(
        "Pomodoro no encontrado",
        errorCodes.POMODORO.POMODORO_NOT_FOUND
      );

    const pomodoroStateTime = assignPomodoroState(time, state);
    const pomodoro = await pomodoroRepository.patchPomodoroStanteAndTime(
      userPomodoro[0]._id,
      pomodoroStateTime.state,
      pomodoroStateTime.time,
      opts
    );

    await session.commitTransaction();
    return pomodoro;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      "Error en el guardado de estado y tiempo del pomodoro",
      e.code || errorCodes.POMODORO.FAILD_TO_UPDATE_POMODORO
    );
  } finally {
    await session.endSession();
  }
};
