import User from "../models/user.model.js";

export const createUser = async (user, opts)=>{
    const newUser = new User(user);
    return await newUser.save({session: opts.session});
}

export const findUserById = async(id)=>{
    return await User.findById(id, '-password -token');
}


export const findAllUsers = async()=>{
    return await User.find({}, '-password -token');
}

export const findUserByEmail = async(email)=>{
    return await User.findOne({email});
}

export const updateUser = async(id, user)=>{
    return await User.findByIdAndUpdate(id, user, {new: true});
}

export const deleteToken = async(id, opts)=>{
    return await User.findByIdAndUpdate(id, {$set: {token: null}}, {new: true,  opts});
}

export const deleteUser = async(id)=>{
    return await User.findByIdAndDelete(id);
}

export const addTodo = async(id, todoId, opts)=>{
    return await User.findByIdAndUpdate(id, {$push: {id_todos: todoId}}, {new: true, opts});
}

export const addToken = async(id, token, opts)=>{
    return await User.findByIdAndUpdate(id,{$set: {token}}, {new: true, opts});
}

export const addPomodoro = async(id, pomodoroId, opts)=>{
    return await User.findByIdAndUpdate(id, {$set:{id_pomodoro: pomodoroId}}, {new: true, opts});
}
export const getToken = async(id)=>{
    return await User.findById(id, 'token');
}