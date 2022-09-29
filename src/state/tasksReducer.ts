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
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export type ChangeTaskActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todolistID: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    taskID: string
    todolistID: string
}
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {


    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todolistID] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistID] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map(task =>
                        task.id === action.taskID ?
                            {...task, isDone: action.isDone}
                            : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map(task =>
                        task.id === action.taskID ?
                            {...task, title: action.title}
                            : task)
            }

        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistID] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, todolistID: todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID}
}
export default tasksReducer;