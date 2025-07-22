import CompleteTaskCheckbox from "./CompleteTaskCheckbox";
import DeleteTaskButton from "./DeleteTaskButton";
import "../App.css";
const TaskItem = ({ task, index, onToggle, onDelete }) => {
  return (
    // <li className="task-item">
    //     {/* <CompleteTaskCheckbox className="check" completed={task.completed} onToggle={() => onToggle(index)} /> */}

    //     {/* <span className={task.completed ? "completed" : ""}> {task.text} </span>   */}
    //     {/* Apply class only to text */}

    //     {/* {task.completed && <DeleteTaskButton onDelete={() => onDelete(index)} />} */}

    // </li>
    <div className="main">
     <div>{ <CompleteTaskCheckbox className="check" completed={task.completed} onToggle={() => onToggle(index)} />}</div>
      <span className={task.completed ? "completed" : ""}> {task.text} </span>
      
      {/* Apply class only to text */}

      {task.completed && <DeleteTaskButton onDelete={() => onDelete(index)} />}
    </div>
  );
};

export default TaskItem;
