import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { Landing } from '../pages/Landing'
import { Login } from '../pages/Login'
import Home from '../pages/Home'
import { useAuth } from '../contexts/AuthContext'
import { MyGraphs } from '../pages/MyGraphs'
import MatrixCreator from '../pages/MatrixCreator'
import { GraphDetail } from '../pages/GraphDetail'

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
      <Route
        path="/matrix-creator"
        element={
          <ProtectedRoute>
            <MatrixCreator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-graphs"
        element={
          <ProtectedRoute>
            <MyGraphs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/graph/:graphId"
        element={
          <ProtectedRoute>
            <GraphDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
} 