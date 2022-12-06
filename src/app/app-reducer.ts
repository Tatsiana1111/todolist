import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI, StatusCode} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}
const slice = createSlice({
    name: 'APP',
    initialState,
    reducers: {
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setIsInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, setIsInitializedAC} = slice.actions


//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === StatusCode.Ok) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setIsInitializedAC({isInitialized: true}))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setIsInitializedAC({isInitialized: true}))
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


