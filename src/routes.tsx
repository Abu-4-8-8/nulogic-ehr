import { type ReactElement } from 'react'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'

export interface RouteConfig {
  path: string
  element: ReactElement
  protected?: boolean
}

export const AppRoutes: RouteConfig[] = [
  {
    path: '/',
    element: <Login />,
    protected: false,
  },
  {
    path: '/login',
    element: <Login />,
    protected: false,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    protected: true,
  },
]
