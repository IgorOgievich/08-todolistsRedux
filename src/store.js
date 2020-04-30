import {createStore} from "redux";


const initialState = {
    todolists: []
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-TODOLIST":
            let newTodoList = [...state.todolists, action.newTodolist];
            return {...state, todolists: newTodoList};
        case "ADD-TASK":
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id === action.todolistsId) {
                        return {...todo, tasks: [...todo.tasks, action.newTask]}
                    } else {
                        return todo
                    }
                })
            };
        case "CHANGE-TASK":
            return {
                ...state, todolists: state.todolists.map(todolist => {
                    if (todolist.id === action.todolistsId) {
                        return {
                            ...todolist, tasks: todolist.tasks.map(task => {
                                if (task.id != action.taskId) {
                                    return task;
                                } else {
                                    return {...task, ...action.obj}
                                }
                            })
                        }
                    } else {
                        return todolist
                    }
                })
            };
        case "DELETE-TODOLIST":
            return {
                ...state, todolists: state.todolists.filter(todo => todo.id !== action.todolistsId)
            };
        case "DELETE-TASK":
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

const store = createStore(reducer);
export default store;


