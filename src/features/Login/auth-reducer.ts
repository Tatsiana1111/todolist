import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType, StatusCode} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'AUTH',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value
        }
    },
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === StatusCode.Ok) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    }).finally(() => {
        dispatch(setAppStatusAC({status: 'idle'}))
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === StatusCode.Ok) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


