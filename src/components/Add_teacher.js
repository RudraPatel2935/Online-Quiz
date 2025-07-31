import React, { useState, useEffect } from 'react';
import './Add_teacher.css';

export default function Add_teacher() {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    institutionId: '',
    email: '',
    subject: '',
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/institutions')
      .then(res => res.json())
      .then(data => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Teacher added successfully!');
        setFormData({
          institutionId: '',
          email: '',
          subject: '',
          username: '',
          password: '',
        });
      } else {
        setMessage(` ${data.error || 'Failed to add teacher'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(' Server error');
    }
  };

  return (
    <div className="add-teacher-container">
      <h2>Add Teacher</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="institutionId" style={{color: "#f2f2f2"}}>Select Institution</label>
        <select
          id="institutionId"
          required
          value={formData.institutionId}
          onChange={handleChange}
        >
          <option value="">-- Select Institution --</option>
          {loading ? (
            <option disabled>Loading institutions...</option>
          ) : (
            institutions.map(inst => (
              <option key={inst._id} value={inst._id}>
                {inst.name} ({inst.code})
              </option>
            ))
          )}
        </select>

        <label htmlFor="email" style={{color: "#f2f2f2"}}>Email</label>
        <input
          type="text"
          id="email"
          placeholder="Enter teacher's email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="subject" style={{color: "#f2f2f2"}}>Subject</label>
        <input
          type="text"
          id="subject"
          placeholder="Enter subject"
          required
          value={formData.subject}
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

        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
}
