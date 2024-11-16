import React, { useState } from 'react';

const StudentCard = ({ students, headline }) => {
  const [forwardedStudents, setForwardedStudents] = useState([]); // State for HOD-approved students
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false); // State to control modal visibility
  const [currentStudentId, setCurrentStudentId] = useState(null); // Store student ID for modal action

  // API call to update student status
  const updateStudentCounsellorState = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3000/student/${studentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ counsellor_state: true }), // Ensure this matches your server logic
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to update student state: ${errorBody}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Handle Accept action and forward to HOD
  const handleAccept = async (student_id) => {
    const response = await fetch(`http://localhost:3000/student/${student_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coordinator_state: true }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Update successful:", data);
      setShowModal(false); // Close modal after accepting
      window.location.reload();
    } else {
      console.error("Error updating student:", response.statusText);
    }
  };

  // Handle Reject action (no forwarding)
  const handleReject = async (student_id) => {
    const response = await fetch(`http://localhost:3000/student/${student_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rejection: true }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Update successful:", data);
      setShowModal(false); // Close modal after accepting
      window.location.reload();
    } else {
      console.error("Error updating student:", response.statusText);
    }// Close modal after rejecting
  };

  // Open modal and set current student ID
  const openModal = (studentId) => {
    setCurrentStudentId(studentId);
    setShowModal(true);
  };
  const openModal1 = (studentId) => {
    setCurrentStudentId(studentId);
    setShowModal1(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };
  const closeModal1 = () => {
    setShowModal(false);
  };

  return (
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-4xl text-center font-bold text-black my-5">{headline}</h2>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {students.map((student) => (
          <div
            key={student._id}
            className="p-6 bg-white rounded-lg shadow-lg text-center transition transform hover:scale-105 duration-300 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Student Name: <span className="text-blue-600">{student.student_name}</span></h3>
            <p className="text-lg text-gray-800 mb-1">Reg No: <span className="text-blue-600">{student.reg_no}</span></p>
            <p className="text-sm text-gray-600 mb-1">Department: <span className="text-blue-600">{student.dept}</span></p>
            <p className="text-sm text-gray-600 mb-1">Hostel Room No: <span className="text-blue-600">{student.hostel_room_no}</span></p>
            <p className="text-sm text-gray-600 mb-1">Counsellor: <span className="text-blue-600">{student.counsellor_name}</span></p>
            <p className="text-sm text-gray-600 mb-1">Reason: <span className="text-blue-600">{student.reason}</span></p>
            <p className="text-sm text-gray-600 mb-1">Start Date: <span className="text-blue-600">{student.start_date}</span></p>
            <p className="text-sm text-gray-600 mb-1">End Date: <span className="text-blue-600">{student.end_date}</span></p>
            <p className="text-sm text-gray-600 mb-1">Place: <span className="text-blue-600">{student.place}</span></p>
            <p className="text-sm text-gray-600 mb-1">Parent Number: <span className="text-blue-600">{student.parent_number}</span></p>
          
            {/* Accept and Reject Buttons */}
           
            {student.coordinator_state === false ? (
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 shadow-md transition duration-300"
                  onClick={() => openModal(student._id)}
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 shadow-md transition duration-300"
                  onClick={() => openModal1(student._id)}
                >
                  Reject
                </button>
              </div>
            ) : (
              <div className="flex justify-center mt-4 space-x-4">
                <p className='text-gray-500 underline'>forwarded to HOD</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Are you sure you want to accept this student?</h3>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
                onClick={() => handleAccept(currentStudentId)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal1 && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Are you sure you want to reject this student?</h3>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
                onClick={closeModal1}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
                onClick={() => handleReject(currentStudentId)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCard;
