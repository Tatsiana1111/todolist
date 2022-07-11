import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    filter: FilterValuesType
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
            return (
                <li className={task.isDone === true ? 'isDone' : ''}>
                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskList is empty</span>

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey === true) {
            onClickAddTask()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const getChangeFilterHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{color: 'crimson'}}>Title is required!</div>}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''}
                        onClick={getChangeFilterHandler("all")}>All
                </button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={getChangeFilterHandler("active")}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active' : ''}
                        onClick={getChangeFilterHandler("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;