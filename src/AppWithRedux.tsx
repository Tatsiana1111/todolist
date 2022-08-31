import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import {IconButton} from "@mui/material/";
import {Menu} from '@mui/icons-material';
import todolistReducer, {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolistReducer";
import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = { id: string, title: string, filter: FilterValuesType }
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    function removeTodolist(todolistID: string) {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(todolistID, value)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }


    function removeTask(taskID: string, todolistID: string) {
        const action = removeTaskAC(taskID, todolistID)
        dispatch(action)
    }

    function addTask(title: string, todolistID: string) {
        const action = addTaskAC(title, todolistID)
        dispatch(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistID)
        dispatch(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistID: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistID)
        dispatch(action)
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{margin: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todolists.map((elem) => {
                        let tasksForTodolist = tasks[elem.id];
                        if (elem.filter === "active") {
                            tasksForTodolist = tasks[elem.id].filter(t => t.isDone === false);
                        }
                        if (elem.filter === "completed") {
                            tasksForTodolist = tasks[elem.id].filter(t => t.isDone === true);
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                        id={elem.id}
                                        key={elem.id}
                                        todolistID={elem.id}
                                        title={elem.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={elem.filter}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}


export default AppWithRedux;
