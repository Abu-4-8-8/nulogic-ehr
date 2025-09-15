import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { AppRoutes } from './routes'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {AppRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute>{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
