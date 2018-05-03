import React from 'react';

function AddTodo({ onAddTodoFormSubmit, onInputChange, value, valid }) {
    return (
        <form onSubmit={onAddTodoFormSubmit}>
            <input
                type="text"
                value={value}
                onChange={onInputChange}
                placeholder="Add a to-do..."
            />
            <input
                type="submit"
                value="Add"
                disabled={!valid}
            />
        </form>
    );
};

export default AddTodo;