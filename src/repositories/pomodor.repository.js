import Pomodoro from "../models/pomodoro.model.js";

export const createPomodoro = async (pomodoro, opts) => {
  const newPomodoro = new Pomodoro(pomodoro);
  return await newPomodoro.save(opts);
};

export const getPomodoros = async () => {
  return await Pomodoro.find();
};

export const getPomodoroById = async (id) => {
  return await Pomodoro.findById(id);
};

export const getPomodoroByUser = async (id) => {
  return await Pomodoro.find({ id_user: id });
};

export const updatePomodoro = async (id, pomodoro, opts) => {
  return await Pomodoro.findByIdAndUpdate(id, pomodoro, { new: true, opts });
};
export const deletePomodoro = async (id) => {
  return await Pomodoro.findByIdAndDelete(id);
};

export const patchTodoInPomodoro = async (id, todo, opts) => {
  return await Pomodoro.findByIdAndUpdate(
    id,
    { $push: { id_todos: todo } },
    { new: true, opts }
  );
};

export const patchStatePomodoro = async (id, state, opts) => {
  return await Pomodoro.findByIdAndUpdate(
    id,
    {
      state,
    },
    { new: true , opts}
  );
};
