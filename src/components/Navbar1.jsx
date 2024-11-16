import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar1.css'; // External CSS for styling
import { FaHome } from 'react-icons/fa';

const Navbar1 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or token
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Outing Request Portal</h2>
      </div>
      <div className='bg-gray-200 px-2 py-2 rounded-sm'>
      <ul className="navbar-links">
        <li>
          <Link to="/"> <FaHome size={24} className="text-blue-700" /></Link>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar1;
