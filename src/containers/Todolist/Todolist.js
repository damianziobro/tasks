import React, {Component} from 'react';

import AddTodo from '../../components/Todolist/AddTodo/AddTodo';
import TodolistComponent from '../../components/Todolist/Todolist';

class Todolist extends Component {
    state = {
        todos: [
            {
                "id": 3,
                "body": "to delete Task body",
                "remind_at": null,
                "created_at": "2018-04-11",
                "created_at_humans": "11 seconds ago"
            },
            {
                "id": 4,
                "body": "to delete Task body",
                "remind_at": null,
                "created_at": "2018-04-11",
                "created_at_humans": "6 seconds ago"
            }
        ],
        todoInputValue: ''
    }

    submitTodo = (event) => {
        const { todoInputValue } = this.state;

        event.preventDefault();
        if (todoInputValue) {
            //dispatch add todo
            console.log(todoInputValue);
            this.setState({todoInputValue: ''});
        }
    }

    changeHandler = (event) => {
        this.setState({todoInputValue: event.target.value});
    }

    render () {
        const { todoInputValue, todos } = this.state;

        return (
            <div>
                <AddTodo value={todoInputValue} changeHandler={this.changeHandler} submitTodo={this.submitTodo}/>
                <TodolistComponent todos={todos} />
            </div>
        );
    }
}

export default Todolist;