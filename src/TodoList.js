import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC, setTodolistsAC} from "./reducer";
import axios from "axios";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    }

    componentDidMount() {
        this.restoreState();
    }

    // saveState = () => {
    //     // переводим объект в строку
    //     let stateAsString = JSON.stringify(this.state);
    //     // сохраняем нашу строку в localStorage под ключом "our-state"
    //     localStorage.setItem("our-state-" + this.props.id, stateAsString);
    // };

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.1//todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY" : "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }
            )
            .then(res => {
                let allTasks = res.data.items;
                this.props.setTasks(allTasks, this.props.id);
            });
    };

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        axios.post(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${this.props.id}/tasks`,
            {title:newText},
            {
                withCredentials: true,
                headers: {"API-KEY" : "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }
        )
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.addTask(response.data.data.item, this.props.id );
                }
            })
        // this.props.addTask(newTask, this.props.id)
    };

    deleteTodolist = (todolistId) => {
        axios.delete(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY" : "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }
        )
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTodolist(this.props.id);
                }
            })
        // this.props.deleteTodolist(this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t;
            } else {
                return {...t, ...obj};
            }
        });
        this.props.changeTask(taskId, obj, this.props.id)

        // this.setState({
        //     tasks: newTasks
        // }, () => { this.saveState(); });
    };
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    };
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };

    render = () => {
        let {tasks =[]} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <div className="todoList-button">
                        <TodoListTitle title={this.props.title}/>
                        <button onClick={this.deleteTodolist}>x</button>
                    </div>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>

                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.isDone === false;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.isDone === true;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todolistsId) => {
            dispatch(addTaskAC(newTask, todolistsId))
        },
        changeTask: (taskId, obj, todolistsId) => {
            dispatch(changeTaskAC(taskId, obj, todolistsId))
        },
        deleteTodolist: (todolistsId) => {
            dispatch(deleteTodolistAC(todolistsId))
        },
        deleteTask: (todolistsId, taskId) => {
            dispatch(deleteTaskAC(todolistsId, taskId))
        },
        setTasks: (todolistId, tasks) => {
            dispatch(setTasksAC(todolistId, tasks))
        }
    }
};

const ConnectedTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default ConnectedTodoList;

