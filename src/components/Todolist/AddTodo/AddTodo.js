import React from 'react';

function AddTodo (props) {
    const { submitTodo, value, changeHandler, valid } = props;

    return (
        <form onSubmit={submitTodo}>
            <input type="text"  value={value} onChange={changeHandler} placeholder="Wpisz todo..." />
            <input type="submit" value="Dodaj todo" disabled={!valid} /> 
        </form>
    );
};

export default AddTodo;