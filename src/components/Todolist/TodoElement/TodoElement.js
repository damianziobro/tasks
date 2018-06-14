import React from 'react';

import styles from './TodoElement.css';

function TodoElement({
  id, onCompleteTodo, todo, onDeleteTodo,
}) {
  return (
    <li className={styles.todoElement}>
      <button id={id} onClick={onCompleteTodo} className={styles.checkbox} />
      <span className={styles.todo}>{todo}</span>
      <button id={id} onClick={onDeleteTodo} className={styles.deleteTodoBtn} />
    </li>
  );
}

export default TodoElement;
