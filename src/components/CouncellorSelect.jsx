import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CounsellorSelect.css'; 
import Navbar1 from './Navbar1';

const CounsellorSelect = () => {
  const [selectedCounsellor, setSelectedCounsellor] = useState('');
  const [showStudents, setShowStudents] = useState(false); // State to trigger the effect
  const navigate = useNavigate();

  const counsellors = [
    { name: 'Dr. Abitha Kumari', value: 'A' },
    { name: 'Dr. Smith', value: 'B' },
    { name: 'Clara', value: 'C' }
  ];

  const handleSelectChange = (e) => {
    setSelectedCounsellor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowStudents(true);  // Trigger animation on submit
    setTimeout(() => {
      navigate('/counsellor', { state: { counsellorName: selectedCounsellor } });
    }, 1000);  // Delay navigation for the effect
  };

  return (
    <div>
      <Navbar1 />
     
    <div className={`counsellor-select-container ${showStudents ? 'fade-out' : ''}`}>
      {!showStudents && (
        <div className="counsellor-card">
          <h1 className="title">Select Your Name</h1>
          <form onSubmit={handleSubmit} className="counsellor-form">
            <select
              value={selectedCounsellor}
              onChange={handleSelectChange}
              className="counsellor-dropdown"
              required
            >
              <option value="" disabled>Select Counsellor</option>
              {counsellors.map((counsellor) => (
                <option key={counsellor.value} value={counsellor.name}>
                  {counsellor.name}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-btn">Show Students</button>
          </form>
        </div>
      )}
      {showStudents && <div className="loading-message">Loading Students...</div>}
    </div>
    
    </div>
  );
};

export default CounsellorSelect;
