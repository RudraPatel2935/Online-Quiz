import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar_admin.css'; 

export default function Navbar_admin() {

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/'; 
  };
  return (
    <nav className="navbar">
      <div className="Left">
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="Right">
        <Link to="/add-institution">Institutions</Link>
        <Link to="/add-student">Students</Link>
        <Link to="/add-quiz">Quizzes</Link>
        <Link to="/results">Results</Link>
        <a href="/" onClick={handleLogout}>Logout</a>
      </div>
    </nav>
  );
}
