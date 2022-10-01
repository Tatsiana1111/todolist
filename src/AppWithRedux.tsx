import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import {IconButton} from "@mui/material/";
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = { id: string, title: string, filter: FilterValuesType }
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('App called')
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [])

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [])


    const removeTask = useCallback((taskID: string, todolistID: string) => {
        dispatch(removeTaskAC(taskID, todolistID))
    }, [])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }, [])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }, [])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistID))
    }, [])


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
