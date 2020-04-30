import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };

    state = {
        editMode: false
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode= () => {
        this.setState({editMode: false});
    };

    // deleteTodoList = (taskId) ={
    //     this.props.deleteTodoList(this.props.task.id)
    // };
    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };


    render = () => {

        let containerCssClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";

        return (
                <div className={containerCssClass}>
                    <input type="checkbox" checked={this.props.task.isDone}
                           onChange={this.onIsDoneChanged}/>
                    { this.state.editMode
                        ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.props.task.title} />
                        : <span onClick={this.activateEditMode}>{this.props.task.id} - {this.props.task.title}</span>
                    }, priority: {this.props.task.priority}
                    <button onClick={this.deleteTask}>x</button>
                </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         todolists: state.todolists
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         deleteTodoList: (taskId) => {
//             const action = {
//                 type: "DELETE-TODOLIST",
//                 taskId: taskId
//             };
//             dispatch(action)
//         }
//     }
// };
//
//
// const ConnectedTodoListTask = connect(mapStateToProps, mapDispatchToProps)(TodoListTask);
//

export default TodoListTask;

