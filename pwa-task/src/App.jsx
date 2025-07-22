import { useState, useEffect } from 'react';
import InstallButton from './components/InstallButton';
import NotificationButton from './components/Notification';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { getTasks, addTask, toggleTaskCompletion, deleteTask } from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    setTasks(getTasks());
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleAddTask = (text) => {
    const newTask = addTask(text);
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = toggleTaskCompletion(id);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = deleteTask(id);
    setTasks(updatedTasks);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager PWA</h1>
        <div className="status-bar">
          <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? 'Online' : 'Offline Mode'}
          </div>
          <InstallButton />
        </div>
      </header>

      <main className="app-main">
        <NotificationButton />
        
        <div className="tasks-container">
          <h2>My Tasks</h2>
          <AddTask onAddTask={handleAddTask} />
          <TaskList 
            tasks={tasks} 
            onToggleComplete={handleToggleComplete} 
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Task Manager PWA - Works Offline</p>
      </footer>
    </div>
  );
}

export default App;