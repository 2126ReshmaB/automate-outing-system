import React from 'react';
import Navbar1 from '../components/Navbar1';
import './Home.css'; // Import the CSS for the home page
import { Link } from 'react-router-dom';
import profile from '../assets/profile.png'

const Home = () => {
  return (
    <>
      <Navbar1 />
      
      <div className="home-container">
        <h1 className="home-title">Welcome to the Automated Outing System</h1>
        <p className="home-description">Your one-stop solution for student outing management.</p>
        
        <div className="grid-container">
          {/* Student */}
          <div className="grid-item">
            <img src={profile} alt="Student" className="grid-image" />
            <Link to="/login" className="home-button">Student</Link>
          </div>
          {/* Counsellor */}
          <div className="grid-item">
            <img src={profile} alt="Counsellor" className="grid-image" />
            <Link to="/login-counsellor" className="home-button">Counsellor</Link>
          </div>
          {/* Another Role (if needed, you can leave it blank or add a new role) */}
          <div className="grid-item">
            <img src={profile} alt="Admin" className="grid-image" />
            <Link to="/year-coordinator" className="home-button">Year Coordinator</Link>
          </div>
          {/* HOD */}
          <div className="grid-item">
            <img src={profile} alt="HOD" className="grid-image" />
            <Link to="/hod" className="home-button">HOD</Link>
          </div>
          <div className="grid-item">
            <img src={profile} alt="Admin" className="grid-image" />
            <Link to="/principal" className="home-button">Principal</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
