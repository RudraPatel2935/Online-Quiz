import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar_student from './Navbar_student';

export default function Login() {
  const [institution, setInstitution] = useState('');
  const [username, setUsername] = useState('');
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!institution || !username || !password) {
    setError("Institution, username, and password are required.");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        institutionId: institution,
        username,
        password,
        ...(roll && { roll }),
      }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      const role = data.role.toLowerCase();
      localStorage.setItem('role', role);
      localStorage.setItem('username', data.username);

      if (role === 'admin') navigate('/dashboard');
      else if (role === 'student'){
        localStorage.setItem('rollNo', roll);
        navigate('/home');
      } 
      else if (role === 'teacher') navigate('/teacher-dashboard');
      else navigate('/');
    }
  } catch (err) {
    console.error('Login failed:', err);
    setError('An error occurred during login.');
  }
};


  const userRole = "";
  return (

    <div>
      <Navbar_student />
      <form onSubmit={handleSubmit}>
        <fieldset style={{ borderRadius: '8px' }}>
          <fieldset style={{ backgroundColor: '#f9f9f9', margin: '12px' }}>
            <label htmlFor="institution">Select Institution</label><br />
            <select
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="INST001">PDPU</option>
              <option value="INST002">Nirma</option>
            </select>

            <label htmlFor="username">Username</label><br />
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="roll">Roll No</label><br />
            <input
              type="text"
              id="roll"
              placeholder="Enter Roll No"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              
            />

            <label htmlFor="password">Password</label><br />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </fieldset>
        </fieldset>
      </form>
    </div>
  );
}
