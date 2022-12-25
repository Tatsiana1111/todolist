import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType, useActions} from '../../app/store'
import {TodolistDomainType} from './todolists-reducer'
import {TasksStateType} from './tasks-reducer'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from "react-router-dom";
import {todolistsActions} from "./index";


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLogginedIn = useSelector<AppRootStateType, boolean>((state) => {
        return state.auth.isLoggedIn
    })
    const {
        addTodolistTC,
        fetchTodolistsTC,
    } = useActions(todolistsActions)

    useEffect(() => {
        if (!isLogginedIn) {
            return;
        }
        fetchTodolistsTC()
    }, [])


    if (!isLogginedIn) {

        return <Navigate to={'/login'}/>
    }
    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistTC}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
