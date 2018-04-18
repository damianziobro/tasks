import React from 'react';

function TodoElement (props) {
    return (
        <li>
            {props.todo}
            <button onClick={props.deleteTodoHandler}>X</button>
        </li>
    );
}

export default TodoElement;