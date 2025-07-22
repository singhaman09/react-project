import { useState } from "react";
import "../App.css";

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() !== "") {  //check if task is not empty
      onAdd(task);
      setTask(""); // Clear input field
     }}

  return (
    <div className="addtask">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Enter a task"/>
      <button onClick={handleAdd}>Add Task</button></div>
  )}

export default AddTask;
