React Redux Web App

A responsive and modern web application built using React and Redux. The app includes user authentication, a protected dashboard, and a contact form that stores user-submitted data in the Redux store (without local storage).


Features

User login and logout functionality

Protected dashboard accessible only after login

Responsive UI with Tailwind CSS

Contact Us form with Redux integration (no persistence in local storage)

Real-time toast notifications using React Toastify

Modular component structure for easy scalability

Tech Stack
React

Redux Toolkit

React Router DOM

Tailwind CSS

React Toastify


Pages


1. Home Page

The landing page of the application. Publicly accessible.


2. Login Page

Allows users to log in. On successful login, navigates to the dashboard. User credentials are stored in localStorage temporarily.


3. Dashboard (Protected Route)

Accessible only if the user is authenticated. Includes:

Welcome message

Logout button which clears Redux state and navigates back to Home

4. Contact Us

Includes a form to submit username, email, and message. Upon submission:

Data is stored in the Redux store
A success toast is shown
Submitted data is displayed below the form in a tabular format


Folder Structure


src/
│
├── components/
│   ├── common/
│   ├── feature/
│   ├── layout/
│   │   ├── footer.jsx
│   │   └── header.jsx
│   └── route/
│       └── PrivateRoute.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── ContactUs.jsx
│
├── redux/
│   ├── store.js
│   └── slices/
│       ├── authentication.js
│       └── contact.js
│
├── App.jsx  
├── index.css  
└── main.jsx




Setup Instructions


1. Clone the Repository

git clone https://github.com/singhaman09/ShopSizzle.git
cd ShopSizzle



2. Install Dependencies

npm install



3. Start the Development Server

npm run dev
The application will be available at http://localhost:5173 (or your configured port).



Redux Store Overview

authSlice: Manages authentication state (login/logout)

contactSlice: Stores submitted contact form data in-memory (not persisted in localStorage)


Additional Info

Toast notifications are shown using React Toastify

State management is handled by Redux Toolkit

Routing and protected pages are implemented using React Router DOM

All styles are built with Tailwind CSS for quick responsiveness