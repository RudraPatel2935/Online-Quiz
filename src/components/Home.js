import React, { useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'student') {
      navigate('/dashboard'); 
    }
  }, [role, navigate]);

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to the Online Quiz Portal</h1>
        <p>
          Hello <strong>Student</strong>, this platform allows you to participate in quizzes and view your results.
        </p>

        <div className="home-buttons">
          <a href="/quiz-list" className="home-btn">Start Quiz</a>
          <a href="/student-result" className="home-btn">View Results</a>
        </div>
      </div>
    </div>
  );
}
