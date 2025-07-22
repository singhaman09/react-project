import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const StudentCard = ({ student, onDelete }) => {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p>Age: {student.age}</p>
      <p>Course: {student.course}</p>
      <div className="card-actions">
        <Link to={`/edit-student/${student.id}`} className="edit-btn">Edit</Link>
        <button onClick={() => onDelete(student.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default StudentCard;
