import React, { useState, useEffect } from 'react';
import './Add_student.css';

export default function Add_student() {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    institution: '',
    email: '',
    roll: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/institutions')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched institutions:', data); // Optional: for debugging
        setInstitutions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch institutions:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        institutionId: formData.institution, 
        email: formData.email,
        roll: formData.roll,
        username: formData.username,
        password: formData.password
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error: ' + data.error);
        } else {
          alert('Student added successfully!');
          setFormData({
            institution: '',
            email: '',
            roll: '',
            username: '',
            password: ''
          });
        }
      })
      .catch(err => {
        console.error('Failed to add student:', err);
        alert('An error occurred while adding the student.');
      });
  };

  return (
    <div className="student-form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="institution" style={{color: "#f2f2f2"}}>Select Institution</label>
        <select
          id="institution"
          required
          value={formData.institution}
          onChange={handleChange}
        >
          <option value="">-- Select Institution --</option>
          {loading ? (
            <option disabled>Loading institutions...</option>
          ) :  (
            institutions.map(inst => (
              <option key={inst._id} value={inst._id}>
                {inst.name} ({inst.code})
              </option>
            ))
          )}
        </select>

        <label htmlFor="email" style={{color: "#f2f2f2"}}>Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter student's email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="roll" style={{color: "#f2f2f2"}}>Roll Number</label>
        <input
          type="text"
          id="roll"
          placeholder="Enter roll number"
          required
          value={formData.roll}
          onChange={handleChange}
        />

        <label htmlFor="username" style={{color: "#f2f2f2"}}>Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password" style={{color: "#f2f2f2"}}>Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
