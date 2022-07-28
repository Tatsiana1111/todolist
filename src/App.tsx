import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = { id: string, title: string, filter: FilterValuesType }
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(elem => elem.id !== todolistID))
        delete tasks[todolistID]
    }

    function removeTask(todolistID: string, taskID: string) {

        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(elem => elem.id !== taskID)})
    }

    function addTask(title: string, todolistID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        debugger
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    function changeTaskTitle(todolistID: string, taskId: string, newTitle: string) {
        let todolistTasks = tasks[todolistID]
        
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }

        // setTasks({
        //
        //     ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        // })
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map((el => el.id === todolistID ? {...el, filter: value} : el)))
    }

    const addTodolist = (title: string) => {
        let todolist: TodolistsType = {id: v1(), title: title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((elem) => {
                let tasksForTodolist = tasks[elem.id];
                if (elem.filter === "active") {
                    tasksForTodolist = tasks[elem.id].filter(t => t.isDone === false);
                }
                if (elem.filter === "completed") {
                    tasksForTodolist = tasks[elem.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        changeTaskTitle={changeTaskTitle}
                        id={elem.id}
                        key={elem.id}
                        todolistID={elem.id}
                        title={elem.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={elem.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
