import React from 'react';

import styles from './Todolist.css';

import TodoElement from './TodoElement/TodoElement';

function Todolist({ todos, onDeleteTodo, onCompleteTodo }) {
  return (
    <ul className={styles.todolist}>
      {todos.map(({ body, id }) => (<TodoElement
        todo={body}
        key={id}
        onDeleteTodo={onDeleteTodo}
        id={id}
        onCompleteTodo={onCompleteTodo}
      />))}
    </ul>
  );
}

export default Todolist;
