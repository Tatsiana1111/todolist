import React, {useCallback} from 'react';
import {FilterValuesType} from '../App';
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material/";
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Task} from "./Task";

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

    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist called')
    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistID, "all"), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistID, "active"), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistID, "completed"), [props.changeFilter, props.id]);
    const onClickRemoveHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])
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
                tasksForTodolist.map(t => <Task
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    task={t}
                    todolistID={props.id}
                    key={t.id}
                />)
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

