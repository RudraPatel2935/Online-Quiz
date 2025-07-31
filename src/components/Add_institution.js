import React, { useState } from 'react';
import './Add_institution.css';

export default function Add_institution() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code) {
      setMessage('Name and Code are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/institutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code, address }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Institution added successfully!');
        setName('');
        setCode('');
        setAddress('');
      } else {
        setMessage(data.error || 'Failed to add institution');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="institution-form-container">
      <h2>Add Institution</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" style={{color: "#ccc"}}>Institution Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter full name of institution"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="code" style={{color: "#ccc"}}>Institution Code</label>
        <input
          type="text"
          id="code"
          placeholder="e.g., PDPU, NIRMA"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <label htmlFor="address" style={{color: "#ccc"}}>Address</label>
        <textarea
          id="address"
          rows="3"
          placeholder="Enter address of institution"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <button type="submit">Add Institution</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
