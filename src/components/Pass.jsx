import React from 'react';
import { useLocation } from 'react-router-dom'; // To get the approved student details
import { useReactToPrint } from 'react-to-print'; // To handle print functionality

const Pass = () => {
  const location = useLocation();
  const { student } = location.state || {}; // Get the approved student from state

  const handlePrint = useReactToPrint({
    content: () => document.getElementById("pass"),
  });

  if (!student) {
    return <p>No student information available.</p>;
  }

  return (
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-5xl text-center font-bold text-black my-5">Outing Pass</h2>

      <div id="pass" className="p-6 bg-white rounded-lg shadow-lg text-center">
        <h3 className="text-2xl font-bold mb-2">Outing Pass for {student.student_name}</h3>
        <p className="text-lg">Reg No: {student.reg_no}</p>
        <p className="text-lg">Department: {student.dept}</p>
        <p className="text-lg">Reason: {student.reason}</p>
        <p className="text-lg">Date: {student.start_date} - {student.end_date}</p>
        <p className="text-lg">Place: {student.place}</p>

        {/* QR Code with student's ID or form link */}
        <div className="my-4">
         
        </div>

        <p>Show this pass at the college gate for verification.</p>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 shadow-md transition duration-300"
      >
        Print Pass
      </button>
    </div>
  );
};

export default Pass;
