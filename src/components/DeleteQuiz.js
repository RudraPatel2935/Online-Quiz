import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeleteQuiz.css';

function DeleteQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');

  useEffect(() => {
    fetchQuizzes();
  }, []);

 const fetchQuizzes = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/quiz');
    console.log("Fetched quizzes:", res.data);  // 👈 Debug log
    setQuizzes(res.data);

    const uniqueSubjects = [
      ...new Set(
        res.data
          .map(q => q.subject && q.subject.trim())
          .filter(subject => subject)
      )
    ];
    console.log("Unique subjects:", uniqueSubjects); // 👈 Debug log
    setSubjects(uniqueSubjects);
    setFilteredQuizzes(res.data);
  } catch (err) {
    console.error('Error fetching quizzes:', err);
  }
};


  const handleDelete = async (quizId) => {
    try {
      await axios.delete(`http://localhost:5000/api/quiz/${quizId}`);
      const updated = quizzes.filter(q => q._id !== quizId);
      setQuizzes(updated);
      filterBySubject(selectedSubject, updated);
    } catch (err) {
      console.error('Error deleting quiz:', err);
    }
  };

  const filterBySubject = (subject, list = quizzes) => {
    setSelectedSubject(subject);
    if (subject === 'All') {
      setFilteredQuizzes(list);
    } else {
      const filtered = list.filter(q => q.subject === subject);
      setFilteredQuizzes(filtered);
    }
  };

  return (
    <div className="delete-quiz-container">
      <h2>Delete Quiz</h2>

      <div className="subject-filter">
        <label>Select Subject:</label>
        <select value={selectedSubject} onChange={(e) => filterBySubject(e.target.value)}>
          <option value="All">All</option>
          {subjects.map((subject, idx) => (
            <option key={idx} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {filteredQuizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Title</th>
              <th>Subject</th>
              <th>Time Limit (min)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuizzes.map(quiz => (
              <tr key={quiz._id}>
                <td>{quiz._id}</td>
                <td>{quiz.title}</td>
                <td>{quiz.subject}</td>
                <td>{quiz.timeLimit}</td>
                <td>
                  <button onClick={() => handleDelete(quiz._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DeleteQuiz;
