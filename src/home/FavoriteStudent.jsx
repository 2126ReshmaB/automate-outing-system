import React, { useEffect, useState } from 'react';
import StudentCard from '../components/StudentCard';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './FavoriteStudent.css'; 

const FavoriteStudent = ({ counsellor }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/students-list")
      .then((res) => res.json())
      .then((data) => {
        const filteredStudents = data.filter(student => student.counsellor_name === counsellor);
        setStudents(filteredStudents);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [counsellor]);

  return (
    <div className="favorite-student-container">
      <h2 className="heading">
        Students under <span className="counsellor-name">{counsellor}</span>
      </h2>

      {students.length > 0 ? (
        <StudentCard students={students} headline={``} />
      ) : (
        <div className="no-student-container">
          <i className="fas fa-trash-alt trash-icon"></i> 
          <p className="no-student-message">No student found under {counsellor}</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteStudent;
