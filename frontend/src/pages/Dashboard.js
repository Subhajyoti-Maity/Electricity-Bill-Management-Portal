import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const ENERGY_TIPS = [
  'Turn off lights when you leave a room to save energy.',
  'Unplug chargers and devices when not in use.',
  'Use LED bulbs instead of incandescent lights.',
  'Run washing machines and dishwashers with full loads.',
  'Set your AC to 24°C (75°F) for optimal efficiency.',
  'Use natural light during the day whenever possible.',
  'Regularly clean or replace air filters in appliances.',
  'Seal windows and doors to prevent cool air leaks.',
  'Switch off computers and monitors when not in use.',
  'Use ceiling fans to circulate air and reduce AC use.'
];

function Dashboard({ token }) {
  const [stats, setStats] = useState({ 
    totalBills: 0, 
    monthlyExpense: {},
    paidBills: 0,
    unpaidBills: 0,
    totalPaidAmount: 0,
    totalUnpaidAmount: 0,
    recentBills: []
  });
  const [error, setError] = useState('');
  const [tip, setTip] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Pick a random tip on mount
    setTip(ENERGY_TIPS[Math.floor(Math.random() * ENERGY_TIPS.length)]);
    const fetchStats = () => {
      if (!token) {
        setError('Authentication required');
        return;
      }
      
      axios.get('http://localhost:5001/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const data = res.data;
          setStats({ 
            totalBills: data.totalBills || 0, 
            monthlyExpense: data.monthlyExpense || {},
            paidBills: data.paidBills || 0,
            unpaidBills: data.unpaidBills || 0,
            totalPaidAmount: data.totalPaidAmount || 0,
            totalUnpaidAmount: data.totalUnpaidAmount || 0,
            recentBills: data.recentBills || []
          });
          setLastUpdated(new Date());
          setError(''); // Clear any previous errors
        })
        .catch(err => {
          console.error('Dashboard fetch error:', err);
          setError(err.response?.data?.error || 'Failed to load dashboard');
        });
    };
    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, [token]);

  const months = Object.keys(stats.monthlyExpense).sort();
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Expense (₹)',
        data: months.map(m => stats.monthlyExpense[m]),
        backgroundColor: '#1976d2',
      },
    ],
  };

  // Monthly comparison: current vs previous month
  let comparison = null;
  if (months.length >= 2) {
    const prevMonth = months[months.length - 2];
    const currMonth = months[months.length - 1];
    comparison = {
      labels: [prevMonth, currMonth],
      datasets: [
        {
          label: 'Expense Comparison (₹)',
          data: [stats.monthlyExpense[prevMonth], stats.monthlyExpense[currMonth]],
          backgroundColor: ['#26c6da', '#00897b'],
        },
      ],
    };
  }

  return (
    <div className="card" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: '32px 24px' }}>
      <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Dashboard</h2>
      {/* Energy-saving tip card */}
      <div style={{
        background: 'linear-gradient(90deg, #26c6da 60%, #00897b 100%)',
        color: '#fff',
        borderRadius: 12,
        padding: '16px 20px',
        marginBottom: 24,
        fontSize: '1.1rem',
        boxShadow: '0 2px 8px #00897b22',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <span role="img" aria-label="lightbulb" style={{ fontSize: 24 }}>💡</span>
        <span>{tip}</span>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {/* Quick Statistics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
        gap: 16, 
        marginBottom: 24 
      }}>
        <div style={{ 
          background: '#f3f4f6', 
          borderRadius: 8, 
          padding: 16, 
          textAlign: 'center',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976d2' }}>{stats.totalBills}</div>
          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Total Bills</div>
        </div>
        
        <div style={{ 
          background: '#f0f9ff', 
          borderRadius: 8, 
          padding: 16, 
          textAlign: 'center',
          border: '1px solid #bae6fd'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0284c7' }}>{stats.paidBills}</div>
          <div style={{ fontSize: '0.9rem', color: '#0369a1' }}>Paid Bills</div>
        </div>
        
        <div style={{ 
          background: '#fef3c7', 
          borderRadius: 8, 
          padding: 16, 
          textAlign: 'center',
          border: '1px solid #fde68a'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>{stats.unpaidBills}</div>
          <div style={{ fontSize: '0.9rem', color: '#92400e' }}>Unpaid Bills</div>
        </div>
        
        <div style={{ 
          background: '#dcfce7', 
          borderRadius: 8, 
          padding: 16, 
          textAlign: 'center',
          border: '1px solid #bbf7d0'
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#16a34a' }}>₹{stats.totalPaidAmount}</div>
          <div style={{ fontSize: '0.9rem', color: '#15803d' }}>Paid Amount</div>
        </div>
        
        <div style={{ 
          background: '#fee2e2', 
          borderRadius: 8, 
          padding: 16, 
          textAlign: 'center',
          border: '1px solid #fecaca'
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#dc2626' }}>₹{stats.totalUnpaidAmount}</div>
          <div style={{ fontSize: '0.9rem', color: '#b91c1c' }}>Unpaid Amount</div>
        </div>
      </div>

      {/* Recent Bills */}
      {stats.recentBills.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ color: '#1976d2', marginBottom: 16 }}>Recent Bills</h3>
          <div style={{ 
            background: '#f8fafc', 
            borderRadius: 8, 
            padding: 16,
            border: '1px solid #e2e8f0'
          }}>
            {stats.recentBills.map((bill, index) => (
              <div key={bill._id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: index < stats.recentBills.length - 1 ? '1px solid #e2e8f0' : 'none'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{bill.customerName}</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    Due: {new Date(bill.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold' }}>₹{bill.amount}</div>
                  <div style={{ 
                    fontSize: '0.8rem',
                    color: bill.status === 'paid' ? '#16a34a' : '#dc2626',
                    textTransform: 'capitalize'
                  }}>
                    {bill.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated Info */}
      <div style={{ 
        fontSize: '0.8rem', 
        color: '#6b7280', 
        textAlign: 'center', 
        marginBottom: 16 
      }}>
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>
      <div style={{ maxWidth: 600, margin: '32px auto' }}>
        <Bar data={data} />
      </div>
      {comparison && (
        <div style={{ maxWidth: 400, margin: '32px auto 0 auto', background: '#f8fbff', borderRadius: 12, boxShadow: '0 2px 8px #00897b11', padding: '18px 12px' }}>
          <h4 style={{ color: '#00897b', marginBottom: 12, textAlign: 'center' }}>Current vs Previous Month</h4>
          <Bar data={comparison} options={{ plugins: { legend: { display: false } } }} height={180} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
