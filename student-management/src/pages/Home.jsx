import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../redux/studentSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  //if deletion is confirmed
  const confirmDelete = (student) => {
    setSelectedStudent(student);
    setShowConfirm(true);
  };

  //perform deletion process
  const handleDelete = () => {
    dispatch(deleteStudent(selectedStudent.id));
    toast.error("Student deleted successfully!",{
      toastId: 'success1',
    });
    setShowConfirm(false);
  };

  return (
    <div>
      <h2>Student List</h2>

      {/* handles if no data  */}
      {students.length === 0 ? (
        <p>No students added yet. <Link to="/add">Add Student</Link></p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Dept</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.gender}</td>
                <td>{s.department}</td>
                <td>
                  <Link to={`/edit/${s.id}`}><button className="edit">Edit</button></Link>
                  <button className="delete" onClick={() => confirmDelete(s)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Popup */}
      {showConfirm && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to delete <strong>{selectedStudent?.name}</strong>?</p>
            <div className="popup-buttons">
              <button onClick={() => setShowConfirm(false)} className="cancel">Cancel</button>
              <button onClick={handleDelete} className="confirm-delete">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
