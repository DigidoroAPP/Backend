import { body, param } from "express-validator";
import { POMODORO_STATE } from "../utils/constants/pomodoroStates.utils.js";

export const patchStatePomodoroValidator = [
    body('state').notEmpty().withMessage('State is required')
    .isString().withMessage('State must be a string')
    .isIn([POMODORO_STATE.WORK, POMODORO_STATE.NONE, POMODORO_STATE.BREAK]).withMessage('State must be one of pending, complete, progress'),

    body('time').optional().isNumeric().withMessage('Time must be a number')

]

export const addTaskPomodoroValidator = [
    body('todoId').notEmpty().withMessage('Id task is required')
    .isMongoId().withMessage('Id task must be a valid mongo id'),

    param('pomodoro').notEmpty.withMessage('Id pomodoro is required')
    .isMongoId().withMessage('Id pomodoro must be a valid mongo id')
]