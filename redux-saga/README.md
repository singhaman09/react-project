# User Listing App

This is a simple React application that demonstrates how to use Redux Toolkit and Redux Saga to manage state and handle asynchronous operations. The app fetches a list of users from a dummy API and displays them on the page.

## Features

- Fetches user data from a dummy API using the `fetch` API.
- Displays a loading indicator while data is being fetched.
- Handles errors gracefully if the API call fails.
- Uses Redux Toolkit for state management.
- Implements Redux Saga for handling side effects.

## Technologies Used

- React
- Redux Toolkit
- Redux Saga
- JavaScript (ES6+)
- CSS (for basic styling)

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

redux-saga/
├── public/
│   ├── vite.svg
├── src/
│   ├── components/
│   │   └── UserList.jsx
│   ├── slices/
│   │   └── userSlice.js
│   ├── sagas/
│   │   └── userSaga.js
│   ├── store.js
│   ├── App.jsx
│   └── msin.jsx
├── package.json
├── index.html