import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../features/todo/todoSlice';

function Todos() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
            <span className="text-gray-100">{todo.text}</span>
            <p className="text-gray-100">{todo.description}</p>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className='text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;