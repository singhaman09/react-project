import TaskItem from "./TaskItem";
import "../App.css";
const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} onToggle={onToggle} onDelete={onDelete} />
      ))} </ul>
  )};

export default TaskList;
