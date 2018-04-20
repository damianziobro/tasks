import React from 'react';

function AddTodo (props) {
    const { submitTodo, value, changeHandler } = props;

    return (
        <form onSubmit={submitTodo}>
            <input type="text"  value={value} onChange={changeHandler} placeholder="Wpisz todo..." />
            <input type="submit" value="Dodaj todo" /> 
        </form>
    );
};

export default AddTodo;