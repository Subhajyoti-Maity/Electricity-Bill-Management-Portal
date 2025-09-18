import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bills({ token }) {
  const [bills, setBills] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [units, setUnits] = useState('');
  const [rate, setRate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const amount = units && rate ? Number(units) * Number(rate) : '';

  const fetchBills = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/bills', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBills(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('Failed to fetch bills');
      setBills([]);
    }
  };

  useEffect(() => { 
    if (token) {
      fetchBills(); 
    }
  }, [token]);

  const handleAdd = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5001/api/bills', {
        customerName,
        units: +units,
        rate: +rate,
        amount: +units * +rate,
        dueDate,
        status: 'unpaid'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomerName(''); setUnits(''); setRate(''); setDueDate('');
      fetchBills();
    } catch (err) {
      setError('Failed to add bill');
    }
  };
  
  const handleMarkPaid = async id => {
    if (!id) {
      setError('Invalid bill ID');
      return;
    }
    try {
      console.log('Marking as paid, ID:', id, 'Token:', token);
      const response = await axios.patch(`http://localhost:5001/api/bills/${id}`, { status: 'paid' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Mark as paid response:', response.data);
      setError(''); // Clear any previous errors
      fetchBills();
    } catch (err) {
      console.error('Error marking as paid:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to mark as paid');
    }
  };

  const handleMarkUnpaid = async id => {
    try {
      await axios.patch(`http://localhost:5001/api/bills/${id}`, { status: 'unpaid' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBills();
    } catch (err) {
      setError('Failed to mark as unpaid');
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5001/api/bills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBills();
    } catch (err) {
      setError('Failed to delete bill');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 1000, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: '32px 24px' }}>
      <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Your Bills</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <label style={{ fontWeight: 500 }}>Customer Name:</label>
        <input type="text" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} required style={{ minWidth: 120 }} />
        <label style={{ fontWeight: 500 }}>Units:</label>
        <input type="number" placeholder="Units" value={units} onChange={e => setUnits(e.target.value)} required style={{ width: 80 }} />
        <label style={{ fontWeight: 500 }}>Rate:</label>
        <input type="number" placeholder="Rate" value={rate} onChange={e => setRate(e.target.value)} required style={{ width: 80 }} />
        <label style={{ fontWeight: 500 }}>Due Date:</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required style={{ width: 140 }} />
        <label style={{ fontWeight: 500 }}>Amount:</label>
        <input type="text" value={amount !== '' ? amount : ''} readOnly placeholder="Auto" style={{ width: 100, background: '#eee' }} />
        <button type="submit">Add Bill</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {/* Paid/Unpaid summary */}
      <div style={{ margin: '16px 0', fontWeight: 500 }}>
        Total Paid: ₹{bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + (b.amount || (b.units * b.rate)), 0)} &nbsp; | &nbsp;
        Total Unpaid: ₹{bills.filter(b => b.status !== 'paid').reduce((sum, b) => sum + (b.amount || (b.units * b.rate)), 0)}
      </div>
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Customer Name</th>
            <th>Units</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, idx) => (
            <tr key={bill._id || bill.id || idx} style={bill.status === 'paid' ? { background: '#e0f7fa' } : {}}>
              <td>{bill.serial || idx + 1}</td>
              <td>{bill.customerName || ''}</td>
              <td>{bill.units}</td>
              <td>{bill.rate}</td>
              <td>{bill.amount !== undefined ? bill.amount : (bill.units * bill.rate)}</td>
              <td>{bill.dueDate}</td>
              <td style={{ fontWeight: 600, color: bill.status === 'paid' ? '#00897b' : '#ff6f61' }}>{bill.status === 'paid' ? 'Paid' : 'Unpaid'}</td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => alert(JSON.stringify(bill, null, 2))}>View</button>
                    <button onClick={() => handleDelete(bill._id || bill.id)}>Delete</button>
                  </div>
                  {(bill._id || bill.id) ? (
                    bill.status !== 'paid' ? (
                      <button onClick={() => handleMarkPaid(bill._id || bill.id)} style={{ background: '#00897b', color: '#fff', width: '100%' }}>Mark as Paid</button>
                    ) : (
                      <button onClick={() => handleMarkUnpaid(bill._id || bill.id)} style={{ background: '#ff6f61', color: '#fff', width: '100%' }}>Mark as Unpaid</button>
                    )
                  ) : (
                    <div style={{ color: 'red', fontSize: '12px' }}>Invalid ID - Please delete and recreate</div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bills;
