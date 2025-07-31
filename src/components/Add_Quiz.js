import React, { useState } from 'react';
import axios from 'axios';
import "./Add_Quiz.css"

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [timeLimit, setTimeLimit] = useState(10); // minutes
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    },
  ]);
  const [message, setMessage] = useState('');

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'question') {
      updated[index].question = value;
    } else if (field === 'correctAnswer') {
      updated[index].correctAnswer = parseInt(value);
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quizData = {
        title,
        subject,
        timeLimit,
        questions,
      };

      const res = await axios.post('http://localhost:5000/api/quiz', quizData);
      setMessage('Quiz added successfully!');
      console.log(res.data);
      setTitle('');
      setSubject('');
      setTimeLimit(10);
      setQuestions([
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add quiz');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{backgroundColor: "#f9f9f9"}}>
      <h2 style={{textAlign: "center", color: "#333"}}>Add New Quiz</h2>
      <fieldset style={{backgroundColor: "#3c4042", margin: "12px", padding: "20px"}}>

        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          /><br /><br />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        /><br /><br />

        <input
          type="number"
          placeholder="Time Limit (minutes)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          required
        /><br /><br />

        <h3 style={{textAlign: "center", color: "#ccc"}}>Questions</h3>
        {questions.map((q, index) => (
          <div key={index} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              required
              /><br /><br />

            {q.options.map((opt, optIndex) => (
              <div key={optIndex}>
                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  style={{marginTop: "10px"}}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                  required
                  />
              </div>
            ))}

            <label style={{color: "#ccc"}}>
              Correct Answer (1-4):&nbsp;
              <input
                type="number"
                min="0"
                max="3"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                required
                />
            </label>
          </div>
        ))}

        <button type="button" onClick={addQuestion} className='form-button-Add-Question'>Add Question</button><br /><br />
        <button type="submit" className='form-button-Submit' style={{backgroundColor: "#007bff"}}>Submit Quiz</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddQuiz;
