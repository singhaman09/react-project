import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask } from '../actions/action'





function App() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  
  const tasks = useSelector((state) => state.tasks);  //it retreieved from store the tasks
  const dispatch = useDispatch();      //dispatch action to store

  const handleAddTask = () => {
    if (taskName && taskDescription) {
      const newTask = {
        id: new Date().getTime(),
        name: taskName,
        description: taskDescription,
      };
      dispatch(addTask(newTask));
      setTaskName('');
      setTaskDescription('');
    }
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button onClick={handleAddTask} className='addbtn'>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleRemoveTask(task.id)} className='btnrm'>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
