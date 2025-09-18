# ⚡ Electricity Bill Management Portal

A full-stack web application for managing electricity bills with React, Node.js, and MongoDB.

## 🚀 Features

- User authentication with JWT tokens
- Add, edit, delete electricity bills
- Real-time dashboard with statistics
- Bill status tracking (paid/unpaid)
- Bill estimator tool
- Responsive design

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