# Redux Todo Application

This is a simple Todo application built with React and Redux Toolkit. The application allows users to add, remove, and view todos, with the state being persisted across sessions using Redux Persist.

## Features

- Add new todos with a description.
- Remove existing todos.
- Persist todos in local storage to maintain state across page refreshes.
- Responsive design using Tailwind CSS.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A set of tools for efficient Redux development.
- **Redux Persist**: A library to persist and rehydrate Redux state.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Getting Started

redux-todo-app/
├── public/
├── src/
│   ├── components/
│   │   ├── AddTodo.js
│   │   └── Todos.js
│   ├── features/
│   │   └── todo/
│   |       └── todoSlice.js
│   ├── app/
│   |    └── store.js
│   ├── App.jsx
|   |── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
|── package-lock.json
|── index.html
└── README.md
