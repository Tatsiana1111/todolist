import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const title: string = 'What to learn'

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: false},
        {id: v1(), title: "JSX", isDone: false},]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        return setTasks(newTasks)
    }

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

    return (
        <div className="App">
            <TodoList title={title} tasks={tasksForRender} removeTask={removeTask} changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
