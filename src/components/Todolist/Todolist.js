import React from 'react';
import './Todolist.css';

import TodoElement from './TodoElement/TodoElement';

const todolist = (props) => {
    return (
        <ul className="Todolist">
        {props.todos.map( todo => <TodoElement todo={todo.body} />)}
        </ul>
    );
}

export default todolist;