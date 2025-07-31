import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

export default function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Teacher Dashboard</h2>
      <div className="options-container">
        <button className="option-button" onClick={() => navigate('/add-quiz1')}>
          Add Quiz
        </button>
        <button className="option-button" onClick={() => navigate('/delete-quiz')}>
          Delete Quiz
        </button>
        <button className="option-button" onClick={() => navigate('/view-results')}>
          View Results
        </button>
      </div>
    </div>
  );
}
