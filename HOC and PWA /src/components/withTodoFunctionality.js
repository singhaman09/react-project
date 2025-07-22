import React, { useState } from 'react';

function withTodoFunctionality(WrappedComponent) {
  return function(props) {
    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
      if (text.trim() !== '') {
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
      }
    };

    const removeTodo = (id) => {
      setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id) => {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    };

    return (
      <WrappedComponent
        todos={todos}
        addTodo={addTodo}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        {...props}
      />
    );
  };
}

export default withTodoFunctionality;