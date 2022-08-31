import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    todolistId: string
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

const initialState: TodolistType[] = []
export const todolistReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {


    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                filter: "all",
                title: action.title
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(el => el.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map((el => el.id === action.id ? {...el, filter: action.filter} : el))
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
export default todolistReducer;