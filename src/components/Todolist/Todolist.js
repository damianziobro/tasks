import React from 'react';
import './Todolist.css';

import TodoElement from './TodoElement/TodoElement';

function Todolist (props) {
    return (
        <ul className="Todolist">
            {props.todos.map((todo) => <TodoElement todo={todo.body} key={todo.id}/>)}
        </ul>
    );
}

export default Todolist;