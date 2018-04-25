import React from 'react';

function TodoElement (props) {
    return (
        <li>
            <input id={props.id} type="checkbox" value="checked" onClick={props.checkedTodoHandler}/>
            {props.todo}
            <button id={props.id} onClick={props.deleteTodoHandler}>X</button>
        </li>
    );
}

export default TodoElement;