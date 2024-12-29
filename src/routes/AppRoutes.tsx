import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { Landing } from '../pages/Landing'
import { Login } from '../pages/Login'
import Home from '../pages/Home'
import About from '../pages/About'
import { useAuth } from '../contexts/AuthContext'
import { MyGraphs } from '../pages/MyGraphs'

export function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/app" /> : <Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<About />} />
      <Route
        path="/my-graphs"
        element={
          <ProtectedRoute>
            <MyGraphs />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
} 