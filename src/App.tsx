import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
// CRUD => R (site)
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    console.log(v1())
    // BLL:
    const title: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([ //[newState, setter(fn)]
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: false},
    ])
    const removeTask = (taskID: string): void => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskID))
    }
    const addTask = (title: string) => {
        const id = v1()
        const isDone = false
        setTasks([{id, title, isDone}, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    let tasksForRender;

    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone === true)
            break
        case "active":
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            tasksForRender = tasks
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }


    // UI:
    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={title}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
