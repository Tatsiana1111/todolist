import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: 'Task Component',
    component: Task
}

const removeTaskCallback = action('Task was removed')
const changeTaskStatusCallback = action('Status was changed')
const changeTaskTitleCallback = action('Title was changed')


export const TaskBaseExample = (props: any) => {
    return (<>
        <Task
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            task={{id: '111', title: 'TaskStories', isDone: true}}
            todolistID={'todolistID1'}
        />
        <Task
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            task={{id: '222', title: 'TaskStoriesAnother', isDone: false}}
            todolistID={'todolistID2'}
        />
    </>)
}