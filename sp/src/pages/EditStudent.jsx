import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AddStudent.css"; 

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "Aman Singh",
        course: "Computer Science"
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters long";
        }

        if (formData.course.length < 3) {
            newErrors.course = "Course must be at least 3 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Updated Student:", { id, ...formData });
            navigate("/"); // Redirect after update
        }
    };

    return (
        <div className="add-student-container">
            <h2>Edit Student</h2>
            <form onSubmit={handleUpdate} className="add-student-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Course</label>
                    <input
                        type="text"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        required
                    />
                    {errors.course && <span className="error">{errors.course}</span>}
                </div>

                <button type="submit" className="submit-btn">Update Student</button>
            </form>
        </div>
    );
};

export default EditStudent;
