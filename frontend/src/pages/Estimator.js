import React, { useState } from 'react';
import axios from 'axios';

function Estimator({ token }) {
  const [units, setUnits] = useState('');
  const [rate, setRate] = useState('');
  const [estimate, setEstimate] = useState(null);

  const handleEstimate = e => {
    e.preventDefault();
    if (!units || !rate) return;
    setEstimate(units * rate);
  };

  return (
    <div style={{ margin: '32px 0' }}>
      <h4>Bill Estimator</h4>
      <form onSubmit={handleEstimate}>
        <input type="number" placeholder="Future Units" value={units} onChange={e => setUnits(e.target.value)} required />
        <input type="number" placeholder="Rate" value={rate} onChange={e => setRate(e.target.value)} required />
        <button type="submit">Estimate</button>
      </form>
      {estimate !== null && <div>Estimated Bill: ₹{estimate}</div>}
    </div>
  );
}

export default Estimator;
