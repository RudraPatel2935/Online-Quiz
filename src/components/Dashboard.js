import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="options-container">
        <button className="option-button" onClick={() => navigate('/add-quiz')}>
          Add Quiz
        </button>
        <button className="option-button" onClick={() => navigate('/add-student')}>
          Add Student to Institution
        </button> 
        <button className="option-button" onClick={() => navigate('/add-institution')}>
          Add Institution
        </button>
        <button className="option-button" onClick={() => navigate('/add-teacher')}>
          Add Teacher
        </button>
      </div>
    </div>
  );
}
