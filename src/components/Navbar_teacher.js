import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar_teacher.css';

export default function Navbar_teacher() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar-teacher">
      <div className="left">
        <Link to="/teacher-dashboard" className="nav-link">Dashboard</Link>
      </div>
      <div className="right">
        <a href="/add-quiz1" class="nav-link">Add Quiz</a>
        <a href="/delete-quiz" class="nav-link">Delete Quiz</a>
        <span className="nav-link logout" onClick={handleLogout}>Logout</span>
      </div>
    </nav>
  );
}
