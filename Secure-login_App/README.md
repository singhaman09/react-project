#React Authentication App

This is a simple React application demonstrating user authentication using a login form, dashboard, protected routes, and session management via localStorage.

##Features
User login using mock API

Protected dashboard route

Persistent authentication using localStorage

Redirects if user is already authenticated

Logout functionality

Styled using Tailwind CSS

##Tech Stack
React

React Router DOM

Axios

Tailwind CSS

##Folder Structure


src/
├── auth/
│   └── auth.js           # Authentication helper functions
├── components/
│   ├── Dashboard.jsx     # Dashboard view after login
│   ├── Home.jsx          # Home with a login button
│   ├── Login.jsx         # Login form
│   └── ProtectedRoute.jsx# Wrapper to protect private routes
├── App.jsx               # Main routing file
└── main.jsx              # Entry point



