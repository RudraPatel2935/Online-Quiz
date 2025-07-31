// src/pages/ViewResultPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewResultsPage.css";

const ViewResultPage = () => {
  const [results, setResults] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [quizId, setQuizId] = useState("");

  const fetchAllResults = async () => {
    try {
      setRollNo("");
      setQuizId("");
      const res = await axios.get("http://localhost:5000/api/quiz/results/filter");
      setResults(res.data);
      
    } catch (err) {
      console.error("Error fetching all results:", err);
    }
  };

  const fetchFilteredResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/quiz/results/filter", {
        params: { rollNo, quizId },
      });
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching filtered results:", err);
    }
  };

  useEffect(() => {
    fetchAllResults();
  }, []);

  return (
    <div className="view-results-container">
      <h2>View Quiz Results</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
        />
        <button onClick={fetchFilteredResults}>Filter</button>
        <button onClick={fetchAllResults}>Show All</button>
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Quiz ID</th>
            <th>Score</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.rollNo}</td>
              <td>{r.quizId}</td>
              <td>{r.score}</td>
              <td>{new Date(r.submittedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResultPage;
