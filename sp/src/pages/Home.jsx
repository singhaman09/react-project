import React, { useState } from "react";
import StudentCard from "../components/StudentCard";
import "../styles/Home.css";

const Home = () => {
    const [students, setStudents] = useState([
        ]);

    return (
        <div className="home-container">
            <h2 className="home-title">Student List</h2>
            <div className="student-list">
                {students.map((student) => (
                    <StudentCard key={student.id} student={student} />
                ))}
            </div>
        </div>
    );
};

export default Home;
