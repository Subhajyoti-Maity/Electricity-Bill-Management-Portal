import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onLogin, onSwitch }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
  await axios.post('http://localhost:5001/api/signup', { username, email, password });
  setSuccess('Signup successful! Please login.');
  setTimeout(onSwitch, 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
  <div style={{ maxWidth: 480, minWidth: 340, margin: '0 auto', fontSize: '1.1rem', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: '32px 24px' }}>
  <h2 style={{ fontSize: '2rem', color: '#1976d2', marginBottom: 24 }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
  <input type="text" style={{ fontSize: '1.1rem', width: '100%', height: 40 }} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required /><br />
  <input type="email" style={{ fontSize: '1.1rem', width: '100%', height: 40 }} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
  <input type="password" style={{ fontSize: '1.1rem', width: '100%', height: 40 }} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
  <button type="submit" style={{ fontSize: '1.1rem', width: 120, height: 40 }}>Sign Up</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <p>Already have an account? <button onClick={onSwitch}>Login</button></p>
    </div>
  );
}

export default Signup;
