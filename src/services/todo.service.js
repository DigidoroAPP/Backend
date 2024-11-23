import { errorCodes } from "../utils/errors/error.code.js";
import { ServiceError } from "../errors/servise.error.js";
import * as todoRepository from "../repositories/todo.respository.js";
import { getUserById } from "./user.service.js";
import { addTodoUser } from "./user.service.js";
import mongoose from "mongoose";

export const createTodo = async (todo) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    const newTodo = await todoRepository.createTodo(todo, opts);
    await addTodoUser(todo.id_user, newTodo.id, opts);

    await session.commitTransaction();
    return newTodo;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      "Create todo error",
      e.code || errorCodes.TODO.FAILD_TO_ADD_TODO
    );
  }finally{
    await session.endSession();
  }
};

export const getTodoById = async (todoId) => {
  try {
    const todo = await todoRepository.getTodoById(todoId);
    if (!todo) throw new ServiceError("Todo not found", errorCodes.TODO.TODO_NOT_FOUND);
    return todo;
  } catch (e) {
    throw new ServiceError(
      "Get todo error",
      e.code || errorCodes.TODO.TODO_FECH_FAIL
    );
  }
};

export const getAllTodos = async () => {
  try {
    const todos = await todoRepository.getTodos();
    return todos || [];
  } catch (e) {
    throw new ServiceError(
      "Get all todos error",
      e.code || errorCodes.TODO.FAILD_TO_GET_ALL_TODOS
    );
  }
};

export const getTodosByUserId = async (userId) => {
  try {
    const existUser = await getUserById(userId);
    if (!existUser) throw new ServiceError("User not found", errorCodes.USER.USER_NOT_FOUND);

    const todos = await todoRepository.getTodoByUserId(userId);
    return todos || [];
  } catch (e) {
    throw new ServiceError(
      "Get todos by user id error",
      e.code || errorCodes.TODO.FAILD_TO_GET_TODOS_BY_USER_ID
    );
  }
};

export const patchTodo = async (todoId, data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    const todo = await todoRepository.updateTodo(todoId, data, opts);
    if (!todo) throw new Error(errorCodes.TODO.TODO_NOT_FOUND);

    await session.commitTransaction();
    return todo;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      "Update todo error",
      e.code || errorCodes.TODO.FAILD_TO_UPDATE_TODO
    );
  }finally{
    await session.endSession();
  }
};

export const deleteTodo = async (todoId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    const todo = await todoRepository.deleteTodo(todoId, opts);
    if (!todo) throw new ServiceError("Todo not found", errorCodes.TODO.TODO_NOT_FOUND);

    await session.commitTransaction();
    return todo;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      "Delete todo error",
      e.code || errorCodes.TODO.FAILD_TO_DELETE_TODO
    );
  }finally{
    await session.endSession();
  }
};

export const getTodoByState = async (state) => {
  try{
    const todos = await todoRepository.findTodoByState(state);
    return todos || [];
  }catch(e){
    throw new ServiceError(
      "Get todo by state error",
      e.code || errorCodes.TODO.FAILD_TO_GET_TODO_BY_STATE
    );
  }
}
// export const patchStateTodo = async (todoId, state) => {
//   try {
//     const todo = await todoRepository.patchStateTodo(todoId, state);
//     if (!todo) throw new ServiceError("Todo not found", errorCodes.TODO.TODO_NOT_FOUND);
//     return todo;
//   } catch (e) {
//     throw new ServiceError(
//       "Patch state todo error",
//       e.code || errorCodes.TODO.FAILD_TO_PATCH_STATE_TODO
//     );
//   }
// };
