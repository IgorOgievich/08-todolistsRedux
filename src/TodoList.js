import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC, setTodolistsAC} from "./reducer";
import axios from "axios";
import api from "./api";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    }

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
       api.getTasks(this.props.id)
            .then(res => {
                let allTasks = res.data.items;
                this.props.setTasks(this.props.id, allTasks);
            });
    };

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        api.createTasks(newText, this.props.id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.addTask(response.data.data.item, this.props.id);
                }
            })
        // this.props.addTask(newTask, this.props.id)
    };

    deleteTodolist = () => {
        api.deleteTodoList(this.props.id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTodolist(this.props.id);
                }
            })
        // this.props.deleteTodolist(this.props.id)
    };

    deleteTask = (taskId) => {
        api.deleteTask(taskId, this.props.id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId);
                }
            })


    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    };

    changedTask = (task, status) => {      //!!!!!!!!!!!!!!!!!!!!!!!!
        let newTask = {...task, status};
        api.createTask(this.props.id, task.id, newTask)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.changeTask(response.data.data.item, this.props.id)
                }
            })
    };

    changeStatus = (task, status) => {
        this.changedTask(task, status);
    };
    changeTitle = (task, title) => {
        this.changedTask(task, title);
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
                                       return t.status === 0;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.status === 2;
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
        changeTask: (task, todolistsId) => {
            dispatch(changeTaskAC(task, todolistsId))
        },
        deleteTodolist: (todolistsId) => {
            dispatch(deleteTodolistAC(todolistsId))
        },
        deleteTask: (todolistsId, taskId) => {
            dispatch(deleteTaskAC(todolistsId, taskId))
        },
        setTasks: (todolistsId, tasks) => {
            dispatch(setTasksAC(todolistsId, tasks))
        }
    }
};

const ConnectedTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default ConnectedTodoList;

