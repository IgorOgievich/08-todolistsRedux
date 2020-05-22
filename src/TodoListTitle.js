import React from 'react';
import './App.css';


class TodoListTitle extends React.Component {
    state = {
        title: this.props.title,
        editMode: false,
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode= () => {
        this.setState({editMode: false});
        this.props.changeTitleTodoList(this.state.title)
    };
    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };

   render = () => {
        return (
            <div>
                {this.state.editMode
                    ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                             value={this.state.title}/>
                    : <h3 className="todoList-header__title" onClick={this.activateEditMode}>{this.state.title}</h3>
                }
            </div>
        );
    }
}

export default TodoListTitle;

