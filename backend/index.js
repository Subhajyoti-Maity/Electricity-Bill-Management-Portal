import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from './models/User.js';
import Bill from './models/Bill.js';
import dotenv from 'dotenv';          // <-- added
dotenv.config();                      // <-- added


const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// MongoDB Atlas connection (now from env)
const MONGO_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Helper: Auth middleware
function auth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}


// Auth routes
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});


// Bill routes
app.get('/api/bills', auth, async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
});

app.post('/api/bills', auth, async (req, res) => {
  const { customerName, units, rate, dueDate } = req.body;
  if (!customerName || !units || !rate || !dueDate) return res.status(400).json({ error: 'Missing fields' });
  try {
    const amount = units * rate;
    const bill = new Bill({ customerName, units, rate, amount, dueDate });
    await bill.save();
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add bill' });
  }
});

app.patch('/api/bills/:id', auth, async (req, res) => {
  try {
    console.log('PATCH request - ID:', req.params.id, 'Body:', req.body);
    
    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid ObjectId:', req.params.id);
      return res.status(400).json({ error: 'Invalid bill ID format' });
    }
    
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bill) {
      console.log('Bill not found with ID:', req.params.id);
      return res.status(404).json({ error: 'Bill not found' });
    }
    console.log('Bill updated successfully:', bill);
    res.json(bill);
  } catch (err) {
    console.error('Error updating bill:', err);
    res.status(500).json({ error: 'Failed to update bill' });
  }
});

app.delete('/api/bills/:id', auth, async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bill deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bill' });
  }
});


// Dashboard endpoints
app.get('/api/dashboard', auth, async (req, res) => {
  try {
    const bills = await Bill.find();
    const totalBills = bills.length;
    
    // Calculate paid/unpaid statistics
    const paidBills = bills.filter(b => b.status === 'paid').length;
    const unpaidBills = bills.filter(b => b.status !== 'paid').length;
    const totalPaidAmount = bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + (b.amount || 0), 0);
    const totalUnpaidAmount = bills.filter(b => b.status !== 'paid').reduce((sum, b) => sum + (b.amount || 0), 0);
    
    // Monthly expense calculation
    const monthlyExpense = bills.reduce((acc, b) => {
      let month = 'Unknown';
      if (b.dueDate) {
        try {
          const date = new Date(b.dueDate);
          if (!isNaN(date.getTime())) {
            month = date.toISOString().slice(0, 7); // YYYY-MM format
          }
        } catch (err) {
          console.error('Date parsing error:', err);
        }
      }
      acc[month] = (acc[month] || 0) + (b.amount || 0);
      return acc;
    }, {});
    
    // Get recent bills (last 5)
    const recentBills = bills
      .sort((a, b) => new Date(b.createdAt || b.dueDate) - new Date(a.createdAt || a.dueDate))
      .slice(0, 5)
      .map(b => ({
        _id: b._id,
        customerName: b.customerName,
        amount: b.amount,
        status: b.status,
        dueDate: b.dueDate
      }));
    
    res.json({ 
      totalBills, 
      monthlyExpense,
      paidBills,
      unpaidBills,
      totalPaidAmount,
      totalUnpaidAmount,
      recentBills,
      lastUpdated: new Date()
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
