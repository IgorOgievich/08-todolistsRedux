import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2: 0;
        this.props.changeStatus(this.props.task, status);
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
        // this.props.changeTitle(this.props.task, e.currentTarget.value);
    };

    state = {
        editMode: false,
        title: this.props.task.title
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode= () => {
        this.setState({editMode: false});
        this.props.changeTitle(this.props.task, this.state.title);
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };

    render = () => {

        let containerCssClass = this.props.task.status === 2 ? "todoList-task done" : "todoList-task";
        return (
                <div className={containerCssClass}>
                    <input type="checkbox" checked={this.props.task.status === 2}
                           onChange={this.onIsDoneChanged}/>
                    { this.state.editMode
                        ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.state.title} />
                        : <span onClick={this.activateEditMode}>{this.state.title}</span>
                    }, priority: {this.props.task.priority}
                    <button onClick={this.deleteTask}>x</button>
                </div>
        );
    }
}


export default TodoListTask;

