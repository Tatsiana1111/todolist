import {appReducer, InitialAppStateType, RequestStatusType, setAppErrorAC, setAppStatusAC} from './app-reducer'

let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        status: 'idle' as RequestStatusType,
        error: null as null | string,
        isInitialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))

    expect(endState.status).toBe('loading');
})

