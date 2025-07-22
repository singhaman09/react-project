import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/AddStudent.css";

const AddStudent = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        department: ""
    });

    const [errors, setErrors] = useState({});

    const departments = ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics"];

    const validateForm = () => {
        let newErrors = {};

        if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters long";
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select a gender";
        }

        if (!formData.department) {
            newErrors.department = "Please select a department";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Student Data:", formData);
            navigate("/"); // Redirect to home page after submission
        }
    };

    return (
        <div className="add-student-container">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit} className="add-student-form">
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
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        />
                        <label htmlFor="male">Male</label>

                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                    {errors.gender && <span className="error">{errors.gender}</span>}
                </div>

                <div className="form-group">
                    <label>Department</label>
                    <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                        ))}
                    </select>
                    {errors.department && <span className="error">{errors.department}</span>}
                </div>

                <button type="submit" className="submit-btn">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;
