import React, {Component} from 'react';

import TodoInput from '../../components/Todolist/TodoInput/TodoInput';
import AddButton from '../../components/Todolist/AddButton/AddButton';
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

        ]
    }

    render () {
        return (
            <div>
                <TodoInput />
                <AddButton />
                <TodolistComponent todos={this.state.todos} />
            </div>
        );
    }
}

export default Todolist;