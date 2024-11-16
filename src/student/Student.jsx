import React, { useContext, useEffect, useState } from 'react';
import './Student.css'; // Optional: For styling
import { Link } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';
import { FaUser } from 'react-icons/fa';
import { AuthContext } from '../contects/AuthProvider';

const Student = () => {

  const { user } = useContext(AuthContext);
  const [studentDetails, setStudentDetails] = useState({
    student_name: '',
    reg_no: '',
    dept: '',
    hostel_room_no: '',
    counsellor_name: '', // This will store the selected counsellor name
    reason: '',
    start_date: '',
    end_date: '',
    place: '',
    parent_number: '',
    counsellor_state: false,
    hod_state: false,
    rejection: false,
    gmail: user.email,
    coordinator_state: false,
    principal_state: false,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
    gmail: user.email,
    coordinator_state: false,
    principal_state: false,
  });

  useEffect(() => {
    if (user && user.email) {
      fetch("http://localhost:3000/students-list")
        .then((res) => res.json()) // Parse the response as JSON
        .then((data) => {
          // Find the student whose Gmail matches the logged-in user's Gmail
          const student = data.find(student => student.gmail === user.email);
          if (student) {
            setStatus(student); // Update status object with the student's data
          }
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
    }
  }, [user]);
  console.log(status);
  // List of counsellors for the dropdown
  const counsellors = ['Dr. Smith', 'Dr. Abitha Kumari', 'Mr. Lee', 'Mrs. Brown', 'Dr. Taylor'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmSubmit = window.confirm('Are you sure you want to submit the details?');
    if (!confirmSubmit) {
      return;
    }

    const requiredFields = ['student_name', 'reg_no', 'dept', 'hostel_room_no', 'counsellor_name'];
    for (const field of requiredFields) {
      if (!studentDetails[field]) {
        setError(`Please fill in the ${field.replace('_', ' ')} field.`);
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:3000/upload-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      setSuccess('Student details submitted successfully!');
      setStudentDetails({
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
        gmail: user.email,
        coordinator_state: false,
       principal_state: false,
      });
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <div className='py-0.5'>
        <Navbar1 />
      </div>
      <div className='flex justify-end'>
        <div className="bg-gray-300 w-20 h-10 mt-1 text-black rounded-1xl shadow-xl flex justify-center mr-3">
          <Link to="/login" className='flex justify-center mt-2'>Logout</Link>
        </div>
        <div className="bg-gray-300 w-20 h-10 mt-1 mr-4 text-white rounded-10xl shadow-xl flex justify-center">
          <Link to="/profile" className='flex justify-center mt-2'>
            <FaUser size={20} color="black" />
          </Link>
        </div>
      </div>
      <div className="student-container">
        <h2>Outing Registration Form</h2>
        <p className='my-5'>Please fill out the following form to register for the upcoming college outing. Ensure that all required fields marked with a red * are filled out accurately. Your information is essential for our planning and coordination. Thank you for your cooperation!</p>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label htmlFor="student_name">Student Name *</label>
            <input
              type="text"
              id="student_name"
              name="student_name"
              value={studentDetails.student_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
  <label htmlFor="student_gmail">Student Gmail *</label>
  {user ? (
        <p className="text-black ml-2 mt-1">{user.email}</p>
      ) : (
        <p className="text-black ml-2 mt-1">Not Logged In</p>
      )}
</div>

          <div className="form-group">
            <label htmlFor="reg_no">Registration Number *</label>
            <input
              type="text"
              id="reg_no"
              name="reg_no"
              value={studentDetails.reg_no}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dept">Department *</label>
            <input
              type="text"
              id="dept"
              name="dept"
              value={studentDetails.dept}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hostel_room_no">Hostel Room No *</label>
            <input
              type="text"
              id="hostel_room_no"
              name="hostel_room_no"
              value={studentDetails.hostel_room_no}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="counsellor_name">Counsellor Name *</label>
            <select
              id="counsellor_name"
              name="counsellor_name"
              value={studentDetails.counsellor_name}
              onChange={handleChange}
              required
            >
              <option value="">Select Counsellor</option>
              {counsellors.map((counsellor, index) => (
                <option key={index} value={counsellor}>
                  {counsellor}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason</label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={studentDetails.reason}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={studentDetails.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={studentDetails.end_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="place">Place</label>
            <input
              type="text"
              id="place"
              name="place"
              value={studentDetails.place}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="parent_number">Parent Number</label>
            <input
              type="text"
              id="parent_number"
              name="parent_number"
              value={studentDetails.parent_number}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
                {/* Timeline for Approval Status */}
                <div className="status-timeline">
          <h3>Approval Status</h3>
          <div className={`status-step ${status.counsellor_state ? 'completed' : ''}`}>
            Counsellor Approval {status.counsellor_state ? '✔️' : '⏳'}
          </div>
          <div className={`status-step ${status.coordinator_state && status.counsellor_state ? 'completed' : ''}`}>
            year-Coordinator Approval {status.coordinator_state ? '✔️' : '⏳'}
          </div>
          <div className={`status-step ${status.hod_state && status.coordinator_state ? 'completed' : ''}`}>
            HOD Approval {status.hod_state ? '✔️' : '⏳'}
          </div>
          <div className={`status-step ${status.hod_state && status.counsellor_state ? 'completed' : ''}`}>
            Principal Approval {status.hod_state ? '✔️' : '⏳'}
          </div>
          {status.rejection && (
            <div className="status-step rejection">
              Application Rejected ❌
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Student;
