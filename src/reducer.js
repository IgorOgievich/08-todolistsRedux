import api from "./api";

export const ADD_TODOLIST = "TodoList/reducer/ADD-TODOLIST";
export const ADD_TASK = "TodoList/reducer/ADD-TASK";
export const CHANGE_TASK = "TodoList/reducer/CHANGE-TASK";
export const DELETE_TODOLIST = "TodoList/reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/reducer/DELETE-TASK";
export const SET_TODOLISTS = "TodoList/reducer/SET-TODOLISTS";
export const SET_TASKS = "TodoList/reducer/SET-TASKS";
export const CHANGE_TITLE_TODOLIST = "TodoList/reducer/CHANGE-TITLE-TODOLIST";



const initialState = {
    todolists: []
};

export const addTodolistAC = (newTodolist) => {
    return {
        type: ADD_TODOLIST,
        newTodolist: newTodolist
    }
};

export const addTaskAC = (newTask, todolistsId) => {
    return {
        type: ADD_TASK,
        newTask: newTask,
        todolistsId: todolistsId
    }
};
export const changeTaskAC = (task) => {
    return {
        type: CHANGE_TASK,
        task: task
    }
};
export const deleteTodolistAC = (todolistsId) => {
    return {
        type: DELETE_TODOLIST,
        todolistsId: todolistsId
    }
};

export const deleteTaskAC = (todolistsId,taskId) => {
    return {
        type: DELETE_TASK,
        todolistsId: todolistsId,
        taskId: taskId
    }
};


export const setTodolistsAC= (todolists, todolistsId) => {
    return {
        type: SET_TODOLISTS,
        todolists: todolists,
        todolistsId: todolistsId
    }
};
export const setTasksAC = (todolistsId, tasks) => {
    return {
        type: SET_TASKS,
        tasks: tasks,
        todolistsId: todolistsId
    }
};

export const changeTitleTodoList = (todolistsId, title) => {
    return{
        type: CHANGE_TITLE_TODOLIST,
        titlr: title,
        todolistsId: todolistsId
    }
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            let newTodoList = [...state.todolists, action.newTodolist];
            return {...state, todolists: newTodoList};
        case ADD_TASK:
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id === action.todolistsId) {
                        return {...todo, tasks: [...todo.tasks, action.newTask]}
                    } else {
                        return todo
                    }
                })
            };
        case CHANGE_TASK:
            return {
                ...state, todolists: state.todolists.map(todolist => {
                    if (todolist.id === action.task.todolistsId) {
                        return {
                            ...todolist, tasks: todolist.tasks.map(task => {
                                if (task.id !== action.task.id
                                ) {
                                    return task;
                                } else {
                                    return {...action.task}
                                }
                            })
                        }
                    } else {
                        return todolist
                    }
                })
            };
        case DELETE_TODOLIST:
            return {
                ...state, todolists: state.todolists.filter(todo => todo.id !== action.todolistsId)
            };
        case SET_TODOLISTS:
            return {
                ...state, todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };
        case SET_TASKS:
            return {
                ...state, todolists: state.todolists.map(t => {
                    if (t.id === action.todolistsId) {
                        return{...t, tasks: action.tasks}
                    } else {
                        return t
                    }
                })
            };
        case DELETE_TASK:
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id === action.todolistsId) {
                        return {...todo, tasks: todo.tasks.filter(task => task.id !== action.taskId)}
                    } else {
                        return todo
                    }
                })
            };
        case CHANGE_TITLE_TODOLIST:
            return {
                ...state, todolists: state.todolists.map(tl => {
                    if(tl.id === action.todolistsId) {
                        return {...tl, title: action.title}
                    }else {
                        return tl
                    }
                })
            };
    }
    return state;
};

//Thunk

export const getTodoListsTC = (dispatch, getState) => {
    api.getTodoList()
         .then(res => {
             dispatch(setTodolistsAC(res.data));
         });
};

export const getTasksTC = (dispatch, getState,) => {
    debugger
    api.getTasks()
         .then(res => {
             debugger
             let allTasks = res.data.items;
             dispatch(setTasksAC(this.props.id, allTasks));
         });

};


