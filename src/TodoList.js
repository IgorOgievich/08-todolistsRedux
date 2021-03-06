import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    changedTaskTC,
    changeTitleTodoListTC,
    deleteTaskTC,
    deleteTodoListTC, getTasksTC, postTaskTC,
} from "./reducer";
import api from "./api";

class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState(this.props.id);
    }

    restoreState = (todoListId) => {
        this.props.getTasks(todoListId);
       // api.getTasks(this.props.id)
       //      .then(res => {
       //          let allTasks = res.data.items;
       //          this.props.setTasks(this.props.id, allTasks);
       //      });
    };

    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        this.props.postTask(newText, this.props.id)
        // api.createTasks(newText, this.props.id)
        //     .then(response => {
        //         if (response.data.resultCode === 0) {
        //             this.props.addTask(response.data.data.item, this.props.id);
        //         }
        //     })
    };

    deleteTodolist = () => {
        this.props.deleteTodoList(this.props.id)
        // api.deleteTodoList(this.props.id)
        //     .then(response => {
        //         if (response.data.resultCode === 0) {
        //             this.props.deleteTodolist(this.props.id);
        //         }
        //     })
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
        // api.deleteTask(this.props.id, taskId)
        //     .then(response => {
        //         if (response.data.resultCode === 0) {
        //             this.props.deleteTask(this.props.id, taskId);
        //         }
        //     })
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, );
    };

    changedTask = (task, status) => {
        this.props.changedTask(task, status)
                // api.createTask(task, status)
                //     .then(response => {
                //         if(response.data.resultCode === 0)
                //         this.props.changeTask(response.data.data.item)
                //     });
    };

    changeStatus = (task, status) => {
        this.changedTask(task, {status: status});
    };
    changeTitle = (task, title) => {
        this.changedTask(task, {title: title});
    };

    changeTitleTodoList = (title) => {
        this.props.changeTitleTodoList(title, this.props.id)
        // api.createTitleTodolist(this.props.id, title)
        //     .then(response => {
        //         if(response.data.resultCode === 0)
        //             this.props.changeTitleTodoList(this.props.id, title)
        //     });
    };

    render = () => {
        let {tasks =[]} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <div className="todoList-button">
                        <TodoListTitle title={this.props.title} changeTitleTodoList={this.changeTitleTodoList}/>
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
        postTask: (newText, todolistsId) => {
            dispatch(postTaskTC(newText, todolistsId))
        },
        changedTask: (task, status) => {
            dispatch(changedTaskTC(task, status))
        },
        deleteTodoList: (todoListId) => {
            dispatch(deleteTodoListTC(todoListId))
        },
        deleteTask: (taskId, todoListId) => {
            dispatch(deleteTaskTC(taskId, todoListId))
        },
        getTasks: (todoListId) => {
            dispatch(getTasksTC(todoListId))
        },
        changeTitleTodoList: (title, todolistsId) => {
            dispatch(changeTitleTodoListTC(title, todolistsId))
        }
    }
};

const ConnectedTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default ConnectedTodoList;

