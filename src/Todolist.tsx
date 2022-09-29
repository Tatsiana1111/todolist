import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material/";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist called')
    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const onClickRemoveHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [])
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={onClickRemoveHandler}><Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistID)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.todolistID)
                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox color={'secondary'}
                                  onChange={onChangeStatusHandler}
                                  checked={t.isDone}/>
                        <EditableSpan onChange={onChangeTitleHandler} title={t.title}/>
                        <IconButton onClick={onClickHandler}><Delete fontSize="small"/></IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button color='primary' variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color='secondary' variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color='secondary' variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

