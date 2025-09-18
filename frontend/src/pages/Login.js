import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/login', { email, password });
      if (res.data.token) {
        onLogin(res.data.token, res.data.username);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
  <div style={{ maxWidth: 480, minWidth: 340, margin: '0 auto', fontSize: '1.1rem', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: '32px 24px' }}>
  <h2 style={{ fontSize: '2rem', color: '#1976d2', marginBottom: 24 }}>Login</h2>
      <form onSubmit={handleSubmit}>
  <input type="email" style={{ fontSize: '1.1rem', width: '100%', height: 40 }} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
  <input type="password" style={{ fontSize: '1.1rem', width: '100%', height: 40 }} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
  <button type="submit" style={{ fontSize: '1.1rem', width: 120, height: 40 }}>Login</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <p>Don't have an account? <button onClick={onSwitch}>Sign up</button></p>
    </div>
  );
}

export default Login;
