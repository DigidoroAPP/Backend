import Todo from "../models/todo.model.js";

export const createTodo = async (todo) => {
  const newTodo = new Todo(todo);
  return await newTodo.save();
};

export const getTodos = async () => {
  return await Todo.find();
};

export const getTodoById = async (id) => {
  return await Todo.findById(id);
};

export const getTodoByUserId = async (userId) => {
  return await Todo.find({ id_user: userId });
};

export const updateTodo = async (id, todo) => {
  return await Todo.findByIdAndUpdate(id, todo, { new: true });
};

export const deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

export const patchStateTodo = async (id, state) => {
  return await Todo.findByIdAndUpdate(id, { state }, { new: true });
};
