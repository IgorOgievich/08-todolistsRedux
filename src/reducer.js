export const ADD_TODOLIST = "TodoList/reducer/ADD-TODOLIST";
export const ADD_TASK = "TodoList/reducer/ADD-TASK";
export const CHANGE_TASK = "TodoList/reducer/CHANGE-TASK";
export const DELETE_TODOLIST = "TodoList/reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/reducer/DELETE-TASK";
export const SET_TODOLISTS = "TodoList/reducer/SET-TODOLISTS";
export const SET_TASKS = "TodoList/reducer/SET-TASKS";


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
export const changeTaskAC = (task, todolistsId) => {
    return {
        type: CHANGE_TASK,
        task: task,
        todolistsId: todolistsId
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
                    if (todolist.id === action.todolistsId) {
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
            }
    }
    return state;
};


