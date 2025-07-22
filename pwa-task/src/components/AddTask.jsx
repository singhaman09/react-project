import { useState } from 'react';

function AddTask({ onAddTask }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="add-button">Add</button>
    </form>
  );
}

export default AddTask;