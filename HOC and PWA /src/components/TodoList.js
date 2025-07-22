import React, { useState } from 'react';
import withTodoFunctionality from './withTodoFunctionality';

function TodoList({ todos, addTodo, removeTodo, toggleTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="todo-form">
        <input 
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="todo-button">Add Todo</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <span 
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withTodoFunctionality(TodoList);