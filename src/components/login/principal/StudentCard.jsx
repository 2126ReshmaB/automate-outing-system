import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const StudentCard = ({ students, headline }) => {
  const [forwardedStudents, setForwardedStudents] = useState([]); // State for HOD-approved students
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false); // State to control modal visibility
  const [currentStudentId, setCurrentStudentId] = useState(null); // Store student ID for modal action

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const signatureCanvasRef = useRef(null);
  const [currentStudent,setCurrentStudent] = useState(null);



  // API call to update student status
  const updateStudentCounsellorState = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3000/student/${studentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hod_state: true }), // Ensure this matches your server logic
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

 

  // Handle signature submission and PDF generation
  const handleSignatureSubmit = () => {
    const signatureDataURL = signatureCanvasRef.current.toDataURL(); // Get the drawn signature as a base64 image
    setShowSignatureModal(false);

    if (currentStudent) {
      generatePDF(currentStudent, signatureDataURL); // Generate PDF with student details and signature
    }
  };

  // Function to generate PDF
  const generatePDF = async (student, signatureDataURL) => {
    const doc = new jsPDF();

    // Add headline and student details
    doc.setFontSize(16);
    doc.text(headline, 10, 20);
    doc.setFontSize(12);
    doc.text(`Student Name: ${student.student_name}`, 10, 30);
    doc.text(`Reg No: ${student.reg_no}`, 10, 40);
    doc.text(`Department: ${student.dept}`, 10, 50);
    doc.text(`Hostel Room No: ${student.hostel_room_no}`, 10, 60);
    doc.text(`Counsellor: ${student.counsellor_name}`, 10, 70);
    doc.text(`Reason: ${student.reason}`, 10, 80);
    doc.text(`Start Date: ${student.start_date}`, 10, 90);
    doc.text(`End Date: ${student.end_date}`, 10, 100);
    doc.text(`Place: ${student.place}`, 10, 110);
    doc.text(`Parent Number: ${student.parent_number}`, 10, 120);

    // Add signature image to the PDF
    if (signatureDataURL) {
      const imgProps = doc.getImageProperties(signatureDataURL);
      const width = 50; // Signature width in PDF
      const height = (imgProps.height * width) / imgProps.width;
      doc.addImage(signatureDataURL, 'PNG', 10, 130, width, height);
      doc.text('Signature:', 10, 125);
    }

    // Save PDF
    doc.save(`${student.student_name}_approval.pdf`);
  };

  const handleApproveAndSign = (student) => {
    setCurrentStudent(student);
    setShowSignatureModal(true);
  };

  const handleClearSignature = () => {
    signatureCanvasRef.current.clear();
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
           
            {student.principal_state === false ? (
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 shadow-md transition duration-300"
                  onClick={() => handleApproveAndSign(student)}
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
                <p className='text-gray-500 underline'>Accepted"✔️"</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showSignatureModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-xl font-bold mb-4">Please Sign Below</h3>
            
            {/* Signature Canvas */}
            <SignatureCanvas
              ref={signatureCanvasRef}
              penColor="black"
              canvasProps={{ width: 300, height: 200, className: 'border rounded-lg' }}
            />

            <div className="flex justify-between mt-4">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 shadow-lg"
                onClick={handleClearSignature}
              >
                Clear
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 shadow-lg"
                onClick={handleSignatureSubmit}
              >
                Submit Signature
              </button>
            </div>

            <button
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 shadow-lg mt-4"
              onClick={() => setShowSignatureModal(false)}
            >
              Cancel
            </button>
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
