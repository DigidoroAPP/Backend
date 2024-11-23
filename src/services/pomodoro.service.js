import { ServiceError } from "../errors/servise.error.js";
import { errorCodes } from "../utils/errors/error.code.js";
import * as pomodoroRepository from "../repositories/pomodor.repository.js";

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

export const getPomodoroById = async (pomodoroId) => {
  try {
    const pomodoro = await pomodoroRepository.getPomodoroById(pomodoroId);
    if (!pomodoro) throw new Error(errorCodes.POMODORO.POMODORO_NOT_FOUND);
    return pomodoro;
  } catch (e) {
    throw new ServiceError(
      "Get pomodoro error",
      e.code || errorCodes.POMODORO.POMODORO_FECH_FAIL
    );
  }
};

export const getAllPomodoros = async () => {
  try {
    const pomodoros = await pomodoroRepository.getPomodoros();
    return pomodoros;
  } catch (e) {
    throw new ServiceError(
      "Get all pomodoros error",
      e.code || errorCodes.POMODORO.FAILD_TO_GET_ALL_POMODOROS
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

export const updatePomodoro = async (pomodoroId, data) => {
  try {
    const pomodoro = await pomodoroRepository.updatePomodoro(pomodoroId, data);
    if (!pomodoro) throw new Error(errorCodes.POMODORO.POMODORO_NOT_FOUND);
    return pomodoro;
  } catch (e) {
    throw new ServiceError(
      "Update pomodoro error",
      e.code || errorCodes.POMODORO.FAILD_TO_UPDATE_POMODORO
    );
  }
};

export const deletePomodoro = async (pomodoroId) => {
  try {
    const pomodoro = await pomodoroRepository.deletePomodoro(pomodoroId);
    if (!pomodoro) throw new Error(errorCodes.POMODORO.POMODORO_NOT_FOUND);
    return pomodoro;
  } catch (e) {
    throw new ServiceError(
      "Delete pomodoro error",
      e.code || errorCodes.POMODORO.FAILD_TO_DELETE_POMODORO
    );
  }
};

export const patchTodoInPomodoro = async (pomodoroId, todoId) => {
  try {
    const pomodoro = await pomodoroRepository.patchTodoInPomodoro(
      pomodoroId,
      todoId
    );
    if (!pomodoro) throw new Error(errorCodes.POMODORO.POMODORO_NOT_FOUND);
    return pomodoro;
  } catch (e) {
    throw new ServiceError(
      "Add todo to pomodoro error",
      e.code || errorCodes.POMODORO.FAILD_TO_ADD_TODO
    );
  }
};

export const patchStatePomodoro = async (pomodoroId, state) => {
  try {
    const pomodoro = await pomodoroRepository.patchStatePomodoro(
      pomodoroId,
      state
    );
    if (!pomodoro) throw new Error(errorCodes.POMODORO.POMODORO_NOT_FOUND);
    return pomodoro;
  } catch (e) {
    throw new ServiceError(
      "Patch state pomodoro error",
      e.code || errorCodes.POMODORO.FAILD_TO_UPDATE_POMODORO
    );
  }
};
