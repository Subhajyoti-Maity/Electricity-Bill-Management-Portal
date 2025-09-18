# ⚡ Electricity Bill Management Portal

A full-stack web application for managing electricity bills with React, Node.js, and MongoDB.

## 🚀 Features

### 🔐 Authentication & Security
- **User Registration & Login** with secure password hashing (bcrypt)
- **JWT Token Authentication** for secure API access
- **Protected Routes** ensuring data privacy and security

### 💡 Bill Management
- **Add New Bills** with customer name, units, rate, and due date
- **Auto-calculated Amount** (Units × Rate per unit)
- **Edit Bill Details** and update information
- **Delete Bills** with confirmation
- **Bill Status Management** - Mark bills as paid/unpaid with one click
- **Due Date Tracking** for better bill management

### 📊 Interactive Dashboard
- **Real-time Statistics** with live data updates every 2 seconds
- **Total Bills Overview** with comprehensive counting
- **Paid vs Unpaid Breakdown** with visual distinction
- **Total Amount Tracking** for both paid and unpaid bills
- **Recent Bills Preview** showing latest transactions
- **Monthly Expense Charts** with Bar chart visualization using Chart.js
- **Energy-saving Tips** rotation with helpful electricity usage tips
- **Color-coded Statistics Cards** for quick visual understanding

### 🧮 Bill Estimator Tool
- **Future Bill Estimation** based on expected units consumption
- **Custom Rate Calculator** for different electricity tariffs
- **Instant Calculation** without saving to database

### 🎨 User Experience
- **Modern UI Design** with professional styling
- **Responsive Layout** works on desktop, tablet, and mobile
- **Grid-based Statistics** adapting to different screen sizes
- **Interactive Elements** with hover effects and smooth transitions
- **Error Handling** with user-friendly error messages
- **Form Validation** on both frontend and backend

### ⚡ Technical Features
- **MongoDB Atlas Integration** for cloud data storage
- **RESTful API** with proper HTTP methods
- **CORS Configuration** for secure cross-origin requests
- **Environment Variables** for secure configuration
- **Auto-refresh Dashboard** updates data without page reload
- **Concurrent Server Management** for both frontend and backend

## 🛠️ Tech Stack

**Frontend:** React, Chart.js  
**Backend:** Node.js, Express, MongoDB Atlas  
**Authentication:** JWT, bcrypt

## ⚡ Quick Start

1. **Clone and install**
```bash
git clone https://github.com/Subhajyoti-Maity/Electricity-Bill-Management-Portal.git
cd Electricity-Bill-Management-Portal
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

2. **Setup environment**
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and JWT secret
```

3. **Start application**
```bash
npm start
```

4. **Access**
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## 📁 Project Structure
```
├── backend/          # Node.js API
│   ├── models/       # Database models
│   ├── config/       # Database connection
│   └── index.js      # Main server
├── frontend/         # React app
│   └── src/pages/    # App components
└── package.json      # Root scripts
```

## 🔒 Environment Setup
```bash
# backend/.env (create this file)
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret_key
```

## 👨‍💻 Author

**Subhajyoti Maity**  
GitHub: [@Subhajyoti-Maity](https://github.com/Subhajyoti-Maity)

---

⭐ **Star this repo if you found it helpful!**

> **Note:** This project uses the `main` branch as the primary branch.