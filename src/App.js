import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodolistAC, getTodoListsTC, SET_TODOLISTS, setTodolistsAC} from "./reducer";
import api from "./api";



class App extends React.Component {

    state = {
        todolists: []
    };

    addTodoList = (title) => {
        api.createTodoList(title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.addTodolist(response.data.data.item);
                }
            })
    };

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("todolists-state", stateAsString);
    };

    restoreState = () => {
        this.props.getTodoLists()
       // api.getTodoList()
       //      .then(res => {
       //          this.props.setTodolists(res.data);
       //      });
    };

    render = () => {
        const todolists = this.props.todolists
            .map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>);

        return (
            <>
                <div>
                   <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const mapDispatchToProps =(dispatch) => {
    return{
        addTodolist: (newTodolist) => {
            dispatch(addTodolistAC(newTodolist))
        },
        // setTodolists: (todolists) => {
        //     dispatch(setTodolistsAC())
        // },
        getTodoLists: () => {
            const thunk = getTodoListsTC;
            dispatch(thunk)
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;



