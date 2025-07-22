import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, editStudent } from "../redux/studentSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function StudentForm() {
  const { id } = useParams();  //Extracts student ID
  const dispatch = useDispatch(); //Function to send actions to Redux store
  const navigate = useNavigate(); //Handles redirection after form submission
  const students = useSelector((state) => state.students); //Fetches existing student data from Redux store.

  //Student Data
  //If id exists (editing mode), it fetches the existing student.
  // If not, it initializes an empty student object for adding mode.
  const student = students.find((s) => s.id === id) || {
    name: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
  };
  const [form, setForm] = useState(student);
  const [errors, setErrors] = useState({});

  //Validate Input Fields
  const validate = () => {
    let newErrors = {};
    if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone number must be 10 digits.";
    if (!form.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (!form.gender) newErrors.gender = "Select a gender.";
    if (!form.department) newErrors.department = "Select a department.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();  //Prevents page reload.
    if (!validate()) return;
    if (id) {
      //used toastify for notification
      dispatch(editStudent({ ...form, id }));
      toast.success("Student edited successfully!",{
        toastId: 'success1',
      });

    } else {
      //used toastify for notification
      dispatch(addStudent({ ...form, id: Date.now().toString() }));
      toast.success("Student added successfully!"),{
        toastId: 'success1',
      };
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">

      {/* Close Button */}
      <button type="button" className="close-btn" onClick={() => navigate("/")}>❌</button>

      <h2>{id ? "Edit Student" : "Add Student"}</h2>

      {/* Name */}
      <label>Name</label>
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      {errors.name && <span className="error-text">{errors.name}</span>}

      {/* Email */}
      <label>Email</label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      {errors.email && <span className="error-text">{errors.email}</span>}

      {/* Phone */}
      <label>Phone</label>
      <input
        type="text"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />
      {errors.phone && <span className="error-text">{errors.phone}</span>}

      {/* Gender */}
      <label>Gender</label>
      <div className="gender-group">
        <label>
          <input
            type="radio"
            value="Male"
            checked={form.gender === "Male"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="Female"
            checked={form.gender === "Female"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          />
          Female
        </label>
      </div>
      {errors.gender && <span className="error-text">{errors.gender}</span>}

      {/* Department */}
      <label>Department</label>
      <select
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
        required
      >
        <option value="">Select Department</option>
        <option value="React JS">React JS</option>
        <option value="Node">Node</option>
        <option value="QA">QA</option>
        <option value="Flutter">Flutter</option>
      </select>
      {errors.department && <span className="error-text">{errors.department}</span>}

      {/* Submit Button */}
      <button type="submit" className="submit-button">Save</button>
    </form>
  );
}
