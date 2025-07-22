import { useState } from "react";                   //Imports the useState hook from React
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([]); //declaared empty task array with settask as to update tasks

  const addTask = (taskText) => {
    setTasks([...tasks, { text: taskText, completed: false }]);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;  // Toggle 'completed' property
    setTasks(updatedTasks);                                        //update arr
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); //creates a new array by keeping only the elements that satisfy the condition.
  };

  return (  //to render ui
    <>
    <div className="todo-container">
      <h2>To-Do List</h2>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />
    </div>

    <footer className="footer">
      <p>@ {new Date().getFullYear()} My To-Do App | All Rights Reserved</p>
    </footer>
    </>
  );}

export default App;
