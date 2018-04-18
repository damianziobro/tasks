import React from 'react';

function AddButton (props) {
    return (
        <button onClick={props.addTodoHandler}>Add todo</button>
    );
};

export default AddButton;