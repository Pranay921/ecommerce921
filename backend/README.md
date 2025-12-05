# MongoDB Authentication Setup

This project now includes a full-stack authentication system with MongoDB Atlas.

## 🔧 Setup Instructions

### 1. Configure MongoDB Password

**IMPORTANT:** Before running the backend, you need to set your MongoDB Atlas password.

1. Open `backend/.env`
2. Replace `<db_password>` with your actual MongoDB Atlas database password
3. Save the file

Example:
```env
MONGODB_URI=mongodb+srv://pranaydeep921_db_user:YOUR_ACTUAL_PASSWORD@cluster1.t9ofifv.mongodb.net/auth_db?retryWrites=true&w=majority&appName=Cluster1
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

You should see:
- ✅ MongoDB Atlas connected successfully
- 🚀 Server running on port 5000

### 3. Start the Frontend

In a new terminal:

```bash
cd pro-front
npm run dev
```

The frontend will start on `http://localhost:5173` (or next available port)

## 🎯 How It Works

### Authentication Flow

1. **First Visit**: Users are redirected to `/login` page
2. **Sign Up**: New users create an account with email, name, and password
3. **Login**: Existing users log in with email and password
4. **Access**: After login, users can access the main application
5. **Logout**: Click the logout button in the navbar to sign out

### Protected Routes

- **Home Page (`/`)**: Requires authentication
- **Login Page (`/login`)**: Public access, redirects to home if already logged in

### Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Token persistence in localStorage
- ✅ Auto-verification on page refresh
- ✅ Protected routes with redirect
- ✅ User greeting in navbar
- ✅ Logout functionality

## 🗂️ Project Structure

```
pro/
├── backend/
│   ├── models/
│   │   └── User.js          # User schema with password hashing
│   ├── routes/
│   │   └── auth.js          # Authentication endpoints
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── server.js            # Express server
│   ├── .env                 # Environment variables (set password here!)
│   └── package.json
│
└── pro-front/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.jsx    # Global auth state
    │   ├── components/
    │   │   └── ProtectedRoute.jsx # Route guard
    │   ├── pages/
    │   │   └── LoginSignup.jsx    # Login/Signup page
    │   ├── component/
    │   │   └── navbar.jsx         # Updated with logout
    │   └── App.jsx                # Protected routes setup
    └── package.json
```

## 🔐 API Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify JWT token (protected)

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB password is set correctly in `.env`
- Ensure port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check browser console for CORS errors

### Can't login/signup
- Check backend terminal for error messages
- Verify MongoDB Atlas connection is successful
- Ensure network allows MongoDB Atlas connections

## 📝 Notes

- Tokens expire after 7 days
- Passwords must be at least 6 characters
- User data is stored in MongoDB Atlas `auth_db` database
