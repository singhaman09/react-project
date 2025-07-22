import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';


function AddTodo() {
    const [input, setInput] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch(); 

    const addTodoHandler = (e) => {
        e.preventDefault();
        if (input.trim() && description.trim()) {   //Check if input is not empty                 
            dispatch(addTodo({ text: input, description })); //send action to the store
            setInput('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={addTodoHandler} className="flex items-center space-x-3 mt-12">
            <input
                type='text'
                className='bg-gray-800 rounded border border-gray-700 text-gray-100 py-3 px-3 leading-6'
                placeholder='Enter a Todo'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <textarea className='space-x-3 mt-2 bg-gray-800 rounded border border-gray-700 text-gray-100 py-2 px-8 leading-4'
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type='submit' className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg space-x-3 mt-2'>
                Add Todo
            </button>
        </form>
    );
}

export default AddTodo;