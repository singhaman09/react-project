import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <div className="App">
      {!isOnline && (
        <div className="offline-banner">
          You are currently offline
        </div>
      )}
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
}

export default App;