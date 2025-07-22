// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
