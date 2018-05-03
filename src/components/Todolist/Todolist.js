import React from 'react';

import './Todolist.css';

import TodoElement from './TodoElement/TodoElement';

function Todolist({ todos, onDeleteTodo, onCompleteTodo }) {
    return (
        <ul className="Todolist">
            {todos.map(({ body, id }) => <TodoElement
                todo={body}
                key={id}
                onDeleteTodo={onDeleteTodo}
                id={id}
                onCompleteTodo={onCompleteTodo}
                />
            )}
        </ul>
    );
};

export default Todolist;