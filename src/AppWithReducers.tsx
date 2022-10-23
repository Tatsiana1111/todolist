// import React, {useReducer, useState} from 'react';
// import './App.css';
// import { Todolist} from './components/Todolist';
// import {v1} from 'uuid';
// import AddItemForm from "./components/AddItemForm";
// import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
// import {IconButton} from "@mui/material/";
// import {Menu} from '@mui/icons-material';
// import todolistsReducer, {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC
// } from "./state/todolistReducer";
// import tasksReducer, {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
//
// export type FilterValuesType = "all" | "active" | "completed";
//
// export type TodolistType = { id: string, title: string, filter: FilterValuesType }
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// export function AppWithReducers() {
//     let todolistID1 = v1();
//     let todolistID2 = v1();
//
//     let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ])
//
//     let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
//         [todolistID1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Rest API", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false},
//         ],
//         [todolistID2]: [
//             {id: v1(), title: "HTML&CSS2", isDone: true},
//             {id: v1(), title: "JS2", isDone: true},
//             {id: v1(), title: "ReactJS2", isDone: false},
//             {id: v1(), title: "Rest API2", isDone: false},
//             {id: v1(), title: "GraphQL2", isDone: false},
//         ]
//     });
//
//
//     function removeTodolist(todolistID: string) {
//         dispatchToTodolistsReducer(removeTodolistAC(todolistID))
//         dispatchToTasksReducer(removeTodolistAC(todolistID))
//     }
//
//     function changeFilter(todolistID: string, value: FilterValuesType) {
//         dispatchToTodolistsReducer(changeTodolistFilterAC(todolistID, value))
//     }
//
//     function addTodolist(title: string) {
//         dispatchToTodolistsReducer(addTodolistAC(title))
//         dispatchToTasksReducer(addTodolistAC(title))
//     }
//
//     function changeTodolistTitle(id: string, newTitle: string) {
//         dispatchToTodolistsReducer(changeTodolistTitleAC(id, newTitle))
//     }
//
//
//     function removeTask(taskID: string, todolistID: string) {
//         dispatchToTasksReducer(removeTaskAC(taskID, todolistID))
//     }
//
//     function addTask(title: string, todolistID: string) {
//         dispatchToTasksReducer(addTaskAC(title, todolistID))
//     }
//
//     function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
//         dispatchToTasksReducer(updateTaskAC(taskId, isDone, todolistID))
//     }
//
//     function changeTaskTitle(taskId: string, newTitle: string, todolistID: string) {
//         dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistID))
//     }
//
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{mr: 2}}
//                     >
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{margin: '20px'}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={2}>
//                     {todolists.map((elem) => {
//                         let tasksForTodolist = tasks[elem.id];
//                         if (elem.filter === "active") {
//                             tasksForTodolist = tasks[elem.id].filter(t => t.isDone === false);
//                         }
//                         if (elem.filter === "completed") {
//                             tasksForTodolist = tasks[elem.id].filter(t => t.isDone === true);
//                         }
//                         return (
//                             <Grid item>
//                                 <Paper style={{padding: '10px'}}>
//                                     <Todolist
//                                         changeTodolistTitle={changeTodolistTitle}
//                                         changeTaskTitle={changeTaskTitle}
//                                         id={elem.id}
//                                         key={elem.id}
//                                         todolistID={elem.id}
//                                         title={elem.title}
//                                         tasks={tasksForTodolist}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeStatus}
//                                         filter={elem.filter}
//                                         removeTodolist={removeTodolist}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     )
// }

export default () => {
}


