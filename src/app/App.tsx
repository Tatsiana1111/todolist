import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import ErrorSnackbar from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Auth/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import {CircularProgress} from "@mui/material";
import {logoutTC} from "../features/Auth/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLogginedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(logoutTC())
    }
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLogginedIn && <Button onClick={onClickHandler} color="inherit">Log Out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    <Route path={'/404'}
                           element={<PageNotFound/>}/>
                </Routes>
            </Container>

        </div>
    )
}

export default App

