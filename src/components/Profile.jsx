import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    student_name: '',
    reg_no: '',
    dept: '',
    hostel_room_no: '',
    counsellor_name: '',
    reason: '',
    start_date: '',
    end_date: '',
    place: '',
    parent_number: '',
    counsellor_state: false,
    hod_state: false,
    rejection: false,
    gmail: user?.email,
    coordinator_state: false,
    principal_state: false,
  });

  useEffect(() => {
    if (user && user.email) {
      fetch("http://localhost:3000/students-list")
        .then((res) => res.json())
        .then((data) => {
          const student = data.find(student => student.gmail === user.email);
          if (student) {
            setStatus(student);
          }
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-400 to-blue-400 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <button
          onClick={() => navigate('/student')}
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-lg shadow"
        >
          Back
        </button>
        
        <div className="relative mb-4">
          <img
            src={`https://ui-avatars.com/api/?name=${status.student_name}&background=random`}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto shadow-md"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{status.student_name || "Student Name"}</h2>
        <p className="text-gray-600">{status.dept || "Department"}</p>
        <p className="text-gray-500">Reg. No: {status.reg_no || "N/A"}</p>

        <div className="bg-blue-50 rounded-lg p-4 mt-6 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-600">Outing Request Details</h3>
          <p><span className="font-semibold">Reason:</span> {status.reason || "N/A"}</p>
          <p><span className="font-semibold">Destination:</span> {status.place || "N/A"}</p>
          <p><span className="font-semibold">Dates:</span> {status.start_date} - {status.end_date}</p>
          <p><span className="font-semibold">Parent Contact:</span> {status.parent_number || "N/A"}</p>
          <p><span className="font-semibold">Counselor:</span> {status.counsellor_name || "N/A"}</p>
        </div>

        <div className="flex justify-around mt-6 text-gray-700">
          <div>
            <p className="font-semibold">Counselor:</p>
            <p>{status.counsellor_state ? "Approved" : "Pending"}</p>
          </div>
          <div>
            <p className="font-semibold">HOD:</p>
            <p>{status.hod_state ? "Approved" : "Pending"}</p>
          </div>
          <div>
            <p className="font-semibold">Coordinator:</p>
            <p>{status.coordinator_state ? "Approved" : "Pending"}</p>
          </div>
          <div>
            <p className="font-semibold">Principal:</p>
            <p>{status.principal_state ? "Approved" : "Pending"}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 shadow-lg">
            Edit Profile
          </button>
          <button className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 shadow-lg">
            New Outing Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
