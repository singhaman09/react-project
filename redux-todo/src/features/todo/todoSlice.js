import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [] // Initial Todo array and nanoid is for identification
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload.text ,
                description:action.payload.description
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
    }
});

export const { addTodo, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;