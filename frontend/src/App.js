import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Dashboard from './pages/Dashboard';
import Bills from './pages/Bills';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Estimator from './pages/Estimator';
import logo from './electricity-logo.svg';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [page, setPage] = useState(token ? 'dashboard' : 'login');
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogin = (token, username) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    localStorage.clear();
    setPage('login');
  };

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #23272f 0%, #1a1d23 100%)' : 'linear-gradient(135deg, #e3f0ff 0%, #f8fbff 100%)' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, background: darkMode ? 'linear-gradient(90deg, #23272f 60%, #00897b 100%)' : 'linear-gradient(90deg, #2196f3 60%, #1976d2 100%)', color: '#fff', boxShadow: '0 2px 12px #0002' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={logo} alt="Electricity Logo" style={{ height: 40, width: 40, filter: 'drop-shadow(0 0 2px #FFD600)' }} />
            <span className="header-title">Electricity Bill Management Portal</span>
          </div>
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <button style={{ background: 'none', color: '#fff', border: 'none', fontSize: 18, cursor: 'pointer', boxShadow: 'none' }} onClick={() => setPage('login')}>Login</button>
            <button style={{ background: 'none', color: '#fff', border: 'none', fontSize: 18, cursor: 'pointer', boxShadow: 'none' }} onClick={() => setPage('signup')}>Register</button>
            <button onClick={() => setDarkMode(dm => !dm)} style={{ marginLeft: 16, background: darkMode ? '#23272f' : '#fff', color: darkMode ? '#fff' : '#23272f', border: '1px solid #b2dfdb', borderRadius: 6, fontSize: 16, padding: '6px 16px', cursor: 'pointer', transition: 'all 0.2s' }}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
          </nav>
        </header>
        <main>
          <div className="card">
            {page === 'signup' ? (
              <Signup onLogin={handleLogin} onSwitch={() => setPage('login')} />
            ) : (
              <Login onLogin={handleLogin} onSwitch={() => setPage('signup')} />
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #23272f 0%, #1a1d23 100%)' : 'linear-gradient(135deg, #e3f0ff 0%, #f8fbff 100%)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, background: darkMode ? 'linear-gradient(90deg, #23272f 60%, #00897b 100%)' : 'linear-gradient(90deg, #2196f3 60%, #1976d2 100%)', color: '#fff', boxShadow: '0 2px 12px #0002' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={logo} alt="Electricity Logo" style={{ height: 40, width: 40, filter: 'drop-shadow(0 0 2px #FFD600)' }} />
          <span className="header-title">Electricity Bill Management Portal</span>
        </div>
        <div style={{ fontSize: 18 }}>
          Welcome, <span style={{ fontWeight: 600 }}>{username}</span>!
          <button style={{ marginLeft: 24 }} onClick={handleLogout}>Logout</button>
          <button onClick={() => setDarkMode(dm => !dm)} style={{ marginLeft: 16, background: darkMode ? '#23272f' : '#fff', color: darkMode ? '#fff' : '#23272f', border: '1px solid #b2dfdb', borderRadius: 6, fontSize: 16, padding: '6px 16px', cursor: 'pointer', transition: 'all 0.2s' }}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
      </header>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '32px 0 0 0' }}>
        <button onClick={() => setPage('dashboard')}>Dashboard</button>
        <button onClick={() => setPage('bills')}>Bills</button>
        <button onClick={() => setPage('estimator')}>Estimator</button>
      </nav>
      <main style={{ maxWidth: 1100, margin: '32px auto', minHeight: 500 }}>
        <div className="card" style={{ boxShadow: 'none', background: 'none', padding: 0, maxWidth: '100%' }}>
          {page === 'dashboard' && <Dashboard token={token} />}
          {page === 'bills' && <Bills token={token} />}
          {page === 'estimator' && <Estimator token={token} />}
        </div>
      </main>
    </div>
  );
}

export default App;
