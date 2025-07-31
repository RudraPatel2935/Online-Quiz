import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const rollNo = localStorage.getItem('rollNo');
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quiz/${quizId}`);
        if (res.data && res.data._id) {
          setQuiz(res.data);
        } else {
          setError('Quiz not found or invalid data.');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching quiz data.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (started && timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && started && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, started, submitted]);

  const handleStart = () => {
    setAnswers(Array(quiz.questions.length).fill(null));
    setTimeLeft(quiz.timeLimit * 60); // convert minutes to seconds
    setStarted(true);
  };

  const handleOptionChange = (qIndex, optIndex) => {
    const updated = [...answers];
    updated[qIndex] = optIndex;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    let sc = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) sc++;
    });
    setScore(sc);
    setSubmitted(true);

    // Send to backend
    try {
    await axios.post('http://localhost:5000/api/quiz/submit', {
      rollNo,
      quizId,
      answers,
      score: sc
    });
  } catch (err) {
    console.error('Submission failed:', err);
  }
};

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial' }}>
      <h2>{quiz.title}</h2>
      <p><strong>Subject:</strong> {quiz.subject}</p>
      <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>

      {!started && !submitted && (
        <button onClick={handleStart} style={buttonStyle}>Start Quiz</button>
      )}

      {started && !submitted && (
        <>
          <h3 style={{ color: 'green' }}>Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</h3>
          {quiz.questions.map((q, index) => (
            <div key={index} style={questionBox}>
              <h4>Q{index + 1}: {q.question}</h4>
              {q.options.map((opt, i) => (
                <label key={i} style={{ display: 'block', marginBottom: '6px' }}>
                  <input
                    type="radio"
                    name={`q${index}`}
                    checked={answers[index] === i}
                    onChange={() => handleOptionChange(index, i)}
                  />{' '}
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
        </>
      )}

      {submitted && (
        <>
          <h3 style={{ color: 'blue', marginLeft: '325px'}}>Quiz Submitted!</h3>
          <p>Your Score: {score} / {quiz.questions.length}</p>
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 18px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '20px'
};

const questionBox = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  padding: '20px',
  marginTop: '20px',
  background: '#f9f9f9'
};

export default QuizPage;
