import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResultPage.css";

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState("");
  const rollNo = localStorage.getItem("rollNo");
  useEffect(() => {
      const fetchResults = async () => {
          try {
        const response = await axios.get(`http://localhost:5000/api/quiz/student-results/${rollNo}`);
        setResults(response.data);
        setFilteredResults(response.data);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      }
    };

    if (rollNo) {
      fetchResults();
    }
  }, [rollNo]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    setSearch(value);

    const filtered = results.filter((res) =>
      res.quizId.toUpperCase().includes(value)
    );
    setFilteredResults(filtered);
  };

  return (
    <div className="result-container">
      <h2>Your Quiz Results</h2>

      <input
        type="text"
        placeholder="Search by Quiz ID"
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      {filteredResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table className="result-table">
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Score</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((res, index) => (
              <tr key={index}>
                <td>{res.quizId}</td>
                <td>{res.score}</td>
                <td>{new Date(res.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResultPage;
