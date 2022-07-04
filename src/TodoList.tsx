import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const tasksListItem = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id)
        return (<li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={removeTask}>x</button>
        </li>)
    })
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressEnter}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {tasksListItem}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;