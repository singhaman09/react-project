function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
    if (!tasks.length) {
      return <div className="empty-list">No tasks yet. Add some!</div>;
    }
  
    return (
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
              />
              <span className="task-text">{task.text}</span>
            </div>
            <button 
              className="delete-button"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
  
  export default TaskList;