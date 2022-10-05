import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    task: TaskType
    todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistID)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistID);
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistID)
    }, [props.changeTaskTitle, props.task.id, props.todolistID])
    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox color={'secondary'}
                  onChange={onChangeStatusHandler}
                  checked={props.task.isDone}/>
        <EditableSpan onChange={onChangeTitleHandler} title={props.task.title}/>
        <IconButton onClick={onClickHandler}><Delete fontSize="small"/></IconButton>
    </div>
})