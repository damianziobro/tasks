import React from 'react';

const addButton = (props) => {
    return (
        <button onClick={props.addTodoHandler}>Add todo</button>
    );
};

export default addButton;