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

> ✅ **Security Status**: All credential exposure issues have been resolved. Your repository is now secure.

### Current Security Implementation
- **✅ Credentials Protected** - `.env` file removed from Git tracking
- **✅ Template Provided** - `.env.example` available for setup guidance  
- **✅ Future Prevention** - Enhanced `.gitignore` prevents accidental commits
- **✅ Best Practices** - Secure environment variable management

### Security Features
- **Password Hashing** with bcrypt for secure user authentication
- **JWT Token Authentication** for secure API access
- **Protected API Routes** requiring valid authentication
- **Input Validation** and sanitization on all endpoints
- **CORS Configuration** for secure cross-origin requests

### Environment Setup
```bash
# Copy the secure template
cp backend/.env.example backend/.env

# Edit with your actual credentials (never commit this file)
# backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5001
JWT_SECRET=your_super_secure_secret_key_32_chars_minimum
```

### Security Best Practices Implemented
- ✅ **No Hardcoded Secrets** - All credentials in environment variables
- ✅ **Git Protection** - `.env` files excluded from version control
- ✅ **Secure Headers** - CORS and security middleware configured
- ✅ **Input Sanitization** - Protection against injection attacks
- ✅ **Token Expiration** - JWT tokens with reasonable expiry times

## ✅ Project Status

### Recent Updates (Latest)
- **✅ Security Fixed** - Removed exposed credentials from repository
- **✅ NPM Scripts Added** - Fixed missing start script in package.json
- **✅ Documentation Updated** - Comprehensive setup instructions
- **✅ Protection Enhanced** - Improved .gitignore for future security

### Current Features
- **✅ User Authentication** - Secure registration and login system
- **✅ Bill Management** - Full CRUD operations for electricity bills
- **✅ Real-time Dashboard** - Live statistics with auto-refresh
- **✅ Responsive Design** - Mobile-friendly interface
- **✅ Data Visualization** - Interactive charts and graphs
- **✅ Secure Backend** - JWT authentication with MongoDB Atlas

### Verified Working
- **✅ Frontend Server** - Runs on http://localhost:3000
- **✅ Backend Server** - Runs on http://localhost:5001  
- **✅ Database Connection** - MongoDB Atlas integration working
- **✅ Authentication Flow** - Login/signup functionality operational
- **✅ Bill Operations** - Add, edit, delete, status updates working
- **✅ Dashboard Analytics** - Real-time statistics display

## 🐛 Troubleshooting

### Common Issues

**"Missing script: start" Error:**
- ✅ **Fixed** - Added proper npm scripts to package.json
- Use `npm start` or `npm run dev` to launch the application

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
