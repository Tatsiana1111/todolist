import {addTodolistTC, changeTodolistEntityStatusAC, fetchTodolistsTC, removeTodolistTC} from './todolists-reducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    TodolistType,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {AppRootStateType} from '../../app/store'

import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {tasks, todolistId}

})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = todolistsAPI.deleteTask(param.todolistId, param.taskId)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {taskId: param.taskId, todolistId: param.todolistId}

})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTask(param.todolistId, param.title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error as AxiosError, thunkAPI.dispatch)
        thunkAPI.dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: 'failed'}))
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.domainModel
    }

    const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)

    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {
                taskId: param.taskId,
                model: param.domainModel,
                todolistId: param.todolistId
            }

        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (e: any) {

        const error = e.response
            ? (e.response.data as { error: string }).error
            : e.message

        handleServerNetworkError({message: e.message}, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: TodolistType) => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(todolist => todolist.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(todolist => todolist.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })


    }
})
export const tasksReducer = slice.reducer


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

