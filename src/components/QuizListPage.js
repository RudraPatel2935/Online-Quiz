import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuizListPage.css';
import { useNavigate } from 'react-router-dom';

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/quiz');
      const data = Array.isArray(res.data) ? res.data : [];
      setAllQuizzes(data);
      setQuizzes(data.slice(0, 7)); // show latest 7
    } catch (err) {
      console.error('Error fetching quizzes:', err);
    }
  };

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);

    if (subject === '') {
      setQuizzes(allQuizzes.slice(0, 7)); // back to 7 latest
    } else {
      const filtered = allQuizzes.filter(q => q.subject === subject);
      setQuizzes(filtered);
    }
  };

  const uniqueSubjects = Array.isArray(allQuizzes)
    ? [...new Set(allQuizzes.map(q => q.subject))]
    : [];

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="quiz-list-container">
      <h2>Available Quizzes</h2>
      <hr />

      <div className="filter-container">
        <label>
          Filter by Subject:&nbsp;
          <select value={selectedSubject} onChange={handleSubjectChange} style={{marginTop: '20px'}}>
            <option value="">All</option>
            {uniqueSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div className="quiz-card" key={quiz._id} onClick={() => handleStartQuiz(quiz._id)}>
            <div className="quiz-title">{quiz.title}</div>
            <div className="quiz-info">
              <p><strong>Subject:</strong> {quiz.subject}</p>
              <p><strong>Total Questions:</strong> {quiz.questions ? quiz.questions.length : quiz.timeLimit}</p>
              <p><strong>Duration:</strong> {quiz.duration || quiz.timeLimit} min</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizListPage;
