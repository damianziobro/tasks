import React from 'react';

import styles from './TodoElement.css';

function TodoElement({ id, onCompleteTodo, todo, onDeleteTodo }) {
    return (
        <li className={styles.todoElement}>
            <input
                id={id}
                type="checkbox"
                value="checked"
                onClick={onCompleteTodo}
                className={styles.checkbox}
            />
            <span>{todo}</span>
            <button id={id} onClick={onDeleteTodo} className={styles.deleteTodoBtn}>
            </button>
        </li>
    );
};

export default TodoElement;