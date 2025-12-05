# E-Commerce Platform with Authentication

A full-stack e-commerce application built with React, Express.js, and MongoDB Atlas, featuring comprehensive authentication including email/password and Google OAuth 2.0.

## 🚀 Features

### Authentication
- ✅ **Email/Password Authentication** - Traditional signup and login
- ✅ **Google OAuth 2.0** - Sign in with Google account
- ✅ **JWT-based Sessions** - Secure token-based authentication
- ✅ **Password Hashing** - bcryptjs for secure password storage
- ✅ **Account Linking** - Automatically links Google accounts to existing email accounts
- ✅ **Protected Routes** - Route guards for authenticated-only pages
- ✅ **Auto-verification** - Token persistence and auto-login on refresh

### User Interface
- ✅ **Modern Design** - Gradient backgrounds, glassmorphism effects
- ✅ **Responsive Layout** - Mobile-friendly design
- ✅ **Smooth Animations** - Framer Motion animations
- ✅ **User Greeting** - Personalized navbar with user name
- ✅ **Logout Functionality** - Secure session termination

---

## 📁 Project Structure

```
pro/
├── backend/                    # Express.js backend server
│   ├── config/
│   │   └── passport.js        # Passport Google OAuth configuration
│   ├── models/
│   │   └── User.js            # User schema with password hashing
│   ├── routes/
│   │   └── auth.js            # Authentication endpoints (login, signup, Google OAuth)
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   ├── server.js              # Express server with Passport & session setup
│   ├── .env                   # Environment variables (DO NOT COMMIT)
│   ├── .env.example           # Example environment variables
│   ├── .gitignore             # Git ignore file
│   └── package.json           # Backend dependencies
│
└── pro-front/                 # React frontend application
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.jsx       # Global auth state management
    │   ├── components/
    │   │   ├── ProtectedRoute.jsx    # Route guard component
    │   │   ├── navbar.jsx            # Navigation with logout
    │   │   ├── hero.jsx              # Hero section
    │   │   ├── ScrollCards.jsx       # Scrolling cards component
    │   │   ├── slideShow.jsx         # Image slideshow
    │   │   ├── Trending.jsx          # Trending section
    │   │   ├── Timer.jsx             # Timer component
    │   │   └── mainfooter.jsx        # Footer component
    │   ├── pages/
    │   │   ├── LoginSignup.jsx       # Login/Signup page with Google OAuth
    │   │   └── AuthCallback.jsx      # Google OAuth callback handler
    │   ├── App.jsx                   # Main app with routing
    │   └── main.jsx                  # React entry point
    └── package.json                  # Frontend dependencies
```

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
- **JWT** - JSON Web Tokens for sessions
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **express-session** - Session management
- **google-auth-library** - Google OAuth verification

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **@react-oauth/google** - Google Sign-In component
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

---

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Google Cloud Console Account** - [Sign up here](https://console.cloud.google.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Pranay921/ecommerce.git
cd pro
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` file with your credentials:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://your_username:YOUR_PASSWORD@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority

# JWT Secret (change this in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# Server Port
PORT=5000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

**Important Notes:**
- Replace `your_username`, `YOUR_PASSWORD`, `your_cluster`, and `your_database` with your MongoDB Atlas credentials
- Replace `your_google_client_id_here` and `your_google_client_secret_here` with your Google OAuth credentials (see next section)
- If your MongoDB password has special characters, URL-encode them:
  - `@` → `%40`
  - `!` → `%21`
  - `#` → `%23`
  - `$` → `%24`

#### Configure Google OAuth (Required for Google Sign-In)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized redirect URIs**, add:
   - `http://localhost:5000/auth/google/callback`
6. Under **Authorized JavaScript origins**, add:
   - `http://localhost:5173`
   - `http://localhost:5000`
7. Click **Save**

#### Start Backend Server

```bash
# Development mode with auto-restart
npm run dev

# OR production mode
npm start
```

You should see:
```
✅ MongoDB Atlas connected successfully
🚀 Server running on port 5000
```

### 3. Frontend Setup

Open a new terminal:

#### Install Dependencies
```bash
cd pro-front
npm install
```

#### Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` file with your Google Client ID:
```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Important:** Use the same Google Client ID from your backend `.env` file. Vite requires the `VITE_` prefix for environment variables to be accessible in the browser.

#### Start Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 🎯 Usage Guide

### Authentication Flow

#### Email/Password Authentication
1. Navigate to `http://localhost:5173`
2. You'll be redirected to `/login` if not authenticated
3. Click **"Sign Up"** to create a new account
4. Enter your name, email, and password (minimum 6 characters)
5. Click **"Sign Up"** button
6. You'll be automatically logged in and redirected to the home page

#### Google OAuth Authentication
1. Navigate to `http://localhost:5173/login`
2. Click the **"Sign in with Google"** button
3. Select your Google account
4. Grant permissions
5. You'll be automatically logged in and redirected to the home page

#### Logout
- Click the **"Logout"** button in the navbar
- You'll be redirected to the login page

---

## 🔐 API Endpoints

### Authentication Routes

#### POST `/api/auth/signup`
Register a new user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/api/auth/verify`
Verify JWT token and get user data (Protected).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/api/auth/google/verify`
Verify Google OAuth credential and authenticate user.

**Request Body:**
```json
{
  "credential": "google_credential_token"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "profilePicture": "https://..."
  }
}
```

#### GET `/auth/google`
Initiates Google OAuth flow (redirects to Google consent screen).

#### GET `/auth/google/callback`
Handles Google OAuth callback and redirects to frontend with token.

---

## 🗄️ Database Schema

### User Model

```javascript
{
  email: String,           // Required, unique, lowercase
  password: String,        // Required for local auth, hashed with bcrypt
  name: String,            // User's display name
  googleId: String,        // Google user ID (unique, sparse)
  authProvider: String,    // 'local' or 'google'
  profilePicture: String,  // Google profile picture URL
  createdAt: Date          // Account creation timestamp
}
```

**Notes:**
- Users authenticated via Google won't have a `password` field
- `googleId` is unique but allows null values (sparse index)
- Existing email accounts can be linked to Google accounts

---

## 🐛 Troubleshooting

### Backend Issues

#### Server won't start
**Problem:** MongoDB connection error
**Solution:**
- Verify MongoDB password in `.env` file
- Check if password has special characters (URL-encode them)
- Ensure your IP is whitelisted in MongoDB Atlas
- Check MongoDB Atlas cluster is running

**Problem:** Port 5000 already in use
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### Google OAuth errors
**Problem:** "redirect_uri_mismatch"
**Solution:**
- Add `http://localhost:5000/auth/google/callback` to authorized redirect URIs in Google Cloud Console
- Ensure the URI matches exactly (no trailing slash)

**Problem:** "OAuth2Strategy requires a clientID option"
**Solution:**
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set in `.env`
- Restart the server after updating `.env`

### Frontend Issues

#### Can't connect to backend
**Problem:** Network error or CORS error
**Solution:**
- Verify backend is running on port 5000
- Check browser console for specific error messages
- Ensure CORS is configured correctly in `server.js`

#### Google Sign-In button doesn't appear
**Problem:** Component not loading
**Solution:**
- Check browser console for errors
- Verify `@react-oauth/google` is installed
- Ensure `VITE_GOOGLE_CLIENT_ID` is set correctly in frontend `.env` file
- Restart the frontend dev server after updating `.env`

#### Token not persisting
**Problem:** User logged out on refresh
**Solution:**
- Check browser's localStorage for `token` key
- Verify token verification endpoint is working
- Check browser console for authentication errors

---

## 📝 Development Commands

### Backend Commands
```bash
# Install dependencies
npm install

# Start development server (with auto-restart)
npm run dev

# Start production server
npm start

# Run with nodemon
nodemon server.js
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## � Security Best Practices

### Environment Variables
- ✅ Never commit `.env` files to Git (both backend and frontend)
- ✅ Always use `.env.example` files with placeholder values
- ✅ Use strong, unique JWT secret in production
- ✅ Rotate secrets regularly
- ✅ Use different credentials for development and production
- ✅ Frontend environment variables must be prefixed with `VITE_` in Vite projects

### Password Security
- ✅ Minimum 6 characters enforced
- ✅ Passwords hashed with bcrypt (salt rounds: 10)
- ✅ Passwords never stored in plain text
- ✅ Passwords never sent in API responses

### Token Security
- ✅ JWT tokens expire after 7 days
- ✅ Tokens stored in localStorage (consider httpOnly cookies for production)
- ✅ Token verification on every protected route
- ✅ Google OAuth tokens verified server-side

### CORS Configuration
- ✅ CORS restricted to frontend origin
- ✅ Credentials enabled for session cookies
- ✅ Update CORS origin for production deployment

---

## 🚀 Deployment

### Backend Deployment (Example: Heroku)

1. Create a new Heroku app
2. Set environment variables in Heroku dashboard
3. Update `GOOGLE_CLIENT_ID` redirect URIs with production URL
4. Deploy:
```bash
git push heroku main
```

### Frontend Deployment (Example: Vercel)

1. Update API URLs in `AuthContext.jsx` to production backend URL
2. Deploy to Vercel:
```bash
npm run build
vercel --prod
```

3. Update Google OAuth authorized JavaScript origins with production URL

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Pranay Deep**
- GitHub: [@Pranay921](https://github.com/Pranay921)

---

## 🙏 Acknowledgments

- MongoDB Atlas for cloud database
- Google Cloud Platform for OAuth services
- React team for the amazing framework
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations

---

## � Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [walkthrough.md](C:\Users\prana\.gemini\antigravity\brain\74f196e9-ebee-4013-9237-6bb5c445b902\walkthrough.md) in the artifacts directory
3. Open an issue on GitHub

---

**Happy Coding! 🎉**
