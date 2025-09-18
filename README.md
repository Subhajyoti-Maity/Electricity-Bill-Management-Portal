# ⚡ Electricity Bill Management Portal

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/Subhajyoti-Maity/Electricity-Bill-Management-Portal)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://github.com/Subhajyoti-Maity/Electricity-Bill-Management-Portal/blob/main/LICENSE)

A modern full-stack web application for managing electricity bills, built with **React** and **Node.js/Express** with **MongoDB Atlas** database. Features secure authentication, real-time dashboard, and comprehensive bill management.

## 📑 Table of Contents
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚡ Quick Start](#-quick-start)
- [ Project Structure](#-project-structure)
- [🔗 API Endpoints](#-api-endpoints)
- [ Security](#-security)
- [🐛 Troubleshooting](#-troubleshooting)
- [👨‍💻 Author](#️-author)

## 🚀 Features

- **User Authentication** - Secure registration and login with JWT tokens
- **Bill Management** - Add, view, edit, and delete electricity bills
- **Real-time Dashboard** - Live statistics with auto-refresh every 2 seconds
- **Bill Status Tracking** - Mark bills as paid/unpaid with instant updates
- **Bill Estimator** - Calculate estimated bills based on units consumed
- **Responsive Design** - Works seamlessly on all devices
- **Data Visualization** - Interactive charts for expense tracking

## 🛠️ Tech Stack

**Frontend:** React 18+, Chart.js, CSS3
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
**Authentication:** JWT tokens, bcrypt password hashing
**Tools:** Concurrently, dotenv, CORS

## ⚡ Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Subhajyoti-Maity/Electricity-Bill-Management-Portal.git
cd Electricity-Bill-Management-Portal
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
cd ..
```

3. **Configure environment variables**
Create `backend/.env` file:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5001
JWT_SECRET=your_secure_jwt_secret_minimum_32_characters
```

> ⚠️ **Security Alert**: Never commit your `.env` file. Use `.env.example` as a template and keep actual credentials secure.

4. **Start the application**
```bash
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 📁 Project Structure
```
Electricity-Bill-Management-Portal/
├── backend/                    # Node.js/Express API Server
│   ├── config/db.js           # MongoDB connection
│   ├── models/                # Data models
│   │   ├── User.js            # User authentication model
│   │   └── Bill.js            # Bill data model
│   ├── .env                   # Environment variables (not in git)
│   ├── index.js               # Main server with API routes
│   └── package.json           # Backend dependencies
├── frontend/                   # React application
│   ├── src/
│   │   ├── pages/             # React components
│   │   │   ├── Login.js       # Authentication
│   │   │   ├── Dashboard.js   # Main dashboard
│   │   │   ├── Bills.js       # Bill management
│   │   │   └── Estimator.js   # Bill calculator
│   │   ├── App.js             # Main App component
│   │   └── index.js           # React entry point
│   ├── public/index.html      # HTML template
│   └── package.json           # Frontend dependencies
├── package.json                # Root dependencies
└── README.md                   # Documentation
```

## 🔗 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login with JWT token

### Bills (Protected Routes)
- `GET /api/bills` - Get all user bills
- `POST /api/bills` - Create new bill
- `PATCH /api/bills/:id` - Update bill status
- `DELETE /api/bills/:id` - Delete bill

### Dashboard (Protected Route)
- `GET /api/dashboard` - Get dashboard statistics

## 🔒 Security

> ⚠️ **Important Security Notice**: This project was flagged for potential credential exposure. Please follow these security practices:

### Credential Protection
- **Never commit** `.env` files to version control
- Use `.env.example` as a template for required variables
- Store sensitive data (MongoDB URI, JWT secrets) in environment variables only
- Rotate credentials if accidentally exposed

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration for secure cross-origin requests

### Environment Setup
```env
# backend/.env (DO NOT COMMIT THIS FILE)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5001
JWT_SECRET=your_super_secure_secret_key_32_chars_minimum
```

Add `.env` to your `.gitignore` file:
```gitignore
# Environment variables
.env
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Verify MongoDB Atlas connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure database user credentials are correct

**Authentication Issues:**
- Clear browser localStorage and re-login
- Verify JWT_SECRET is set in `.env`
- Check token expiration

**Port Conflicts:**
- Ensure ports 3000 and 5001 are available
- Update port configuration if needed

**Dashboard Not Loading:**
- Check backend connection at http://localhost:5001
- Verify authentication token validity
- Check browser console for errors

## ‍💻 Author

**Subhajyoti Maity**
- GitHub: [@Subhajyoti-Maity](https://github.com/Subhajyoti-Maity)
- Repository: [Electricity-Bill-Management-Portal](https://github.com/Subhajyoti-Maity/Electricity-Bill-Management-Portal)

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

[![GitHub stars](https://img.shields.io/github/stars/Subhajyoti-Maity/Electricity-Bill-Management-Portal?style=social)](https://github.com/Subhajyoti-Maity/Electricity-Bill-Management-Portal/stargazers)

**Made with ❤️ by [Subhajyoti Maity](https://github.com/Subhajyoti-Maity)**

</div>
