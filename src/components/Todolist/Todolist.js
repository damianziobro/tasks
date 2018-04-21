import React from 'react';
import './Todolist.css';

import TodoElement from './TodoElement/TodoElement';

function Todolist (props) {
    //index as a key is only temoprary solution, change this to using unique key from backend
    return (
        <ul className="Todolist">
            {props.todos.map( (todo, index) => <TodoElement todo={todo.text} key={index}/>)}
        </ul>
    );
}

export default Todolist;