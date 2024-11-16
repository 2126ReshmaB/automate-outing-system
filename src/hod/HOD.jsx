import React from 'react';
import { useLocation } from 'react-router-dom'; // To get forwarded students via state
import Navbar1 from '../components/Navbar1';

const HOD = () => {
  const location = useLocation();
  const { forwardedStudents } = location.state || {}; // Get forwarded students from state

  return (
    <div>
    <Navbar1 />
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-5xl text-center font-bold text-black my-5">HOD Approval</h2>

      {/* Display forwarded students */}
      {forwardedStudents && forwardedStudents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {forwardedStudents.map((student) => (
            <div
              key={student._id}
              className="p-6 bg-white rounded-lg shadow-lg text-center transition transform hover:scale-105 duration-300 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{student.student_name}</h3>
              <p className="text-lg text-gray-800 mb-1">Reg No: {student.reg_no}</p>
              <p className="text-sm text-gray-600 mb-1">Department: {student.dept}</p>
              {/* Display other student details */}
            </div>
          ))}
        </div>
      ) : (
        <p>No students forwarded for approval.</p>
      )}
    </div>
    </div>
  );
};

export default HOD;
