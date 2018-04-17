import React from 'react';

const todoElement = (props) => {
    return (
        <li>
            {props.todo}
            <button onClick={props.deleteTodoHandler}>X</button>
        </li>
    );
}

export default todoElement;