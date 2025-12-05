import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Hero from './component/hero'
import Navbar from './component/navbar'
import ScrollCards from './component/ScrollCards'
import Slideshow from './component/slideShow'
import Trending from './component/Trending'
import Timer from './component/Timer'
import IndexFooter from './component/mainfooter'
import LoginSignup from './pages/LoginSignup'
import AuthCallback from './pages/AuthCallback'

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <ScrollCards />
    <Slideshow />
    <Trending />
    <Timer />
    <IndexFooter />
  </>
)

// Wrapper to redirect authenticated users away from login
const LoginRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <LoginSignup />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
