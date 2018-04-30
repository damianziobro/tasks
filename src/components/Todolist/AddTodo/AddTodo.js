import React from 'react';

function AddTodo (props) {
    const { submitTodo, value, changeHandler, valid } = props;

    return (
        <form onSubmit={submitTodo}>
            <input type="text"  value={value} onChange={changeHandler} placeholder="Add a to-do..." />
            <input type="submit" value="Add" disabled={!valid} /> 
        </form>
    );
};

export default AddTodo;