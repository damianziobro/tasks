import React from 'react';

function TodoElement({ id, onCompleteTodo, todo, onDeleteTodo }) {
    return (
        <li>
            <input id={id} type="checkbox" value="checked" onClick={onCompleteTodo}/>
            <span>{todo}</span>
            <button id={id} onClick={onDeleteTodo}>X</button>
        </li>
    );
};

export default TodoElement;