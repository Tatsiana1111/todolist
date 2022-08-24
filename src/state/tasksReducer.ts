import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistReducer";

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    taskID: string
    todolistId: string
}

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {


    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(el => el.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(el => el.id === action.taskID)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string): ChangeTaskActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistId}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistId}
}
export default tasksReducer;