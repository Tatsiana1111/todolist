import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType, StatusCode} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppThunk} from "../../app/store";
import {createSlice} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'AUTH',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC: (state, action: any) => {
            state.isLoggedIn = action.value
        }
    },
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === StatusCode.Ok) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    }).finally(() => {
        dispatch(setAppStatusAC('idle'))
    })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === StatusCode.Ok) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


