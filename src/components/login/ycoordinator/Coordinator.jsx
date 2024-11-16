import React, { useEffect, useState } from 'react';
import Navbar1 from '../../Navbar1';
import StudentCard from './StudentCard';

const Coordinator = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/students-list');
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredStudents = data.filter(student => student.counsellor_state === true);
        setStudents(filteredStudents);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading students...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar1 />
      <div className="container mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-black mb-2">
            Year Coordinator Dashboard
          </h2>
          <p className="text-md text-gray-500 italic">
            Viewing students with counselor-approved status
          </p>
        </div>
        {students.length > 0 ? (
          <StudentCard students={students} headline="" />
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-gray-700">No students found with counselor approval.</p>
            <img src="https://example.com/no-data.svg" alt="No data" className="mx-auto mt-4 w-1/3 opacity-75"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coordinator;

