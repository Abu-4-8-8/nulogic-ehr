import { type ReactElement } from 'react'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import PatientOnboarding from './pages/kiosk/patient-onboarding/PatientOnboarding'
import MainLayout from './components/layouts/MainLayout'
import PatientListing from './pages/kiosk/patient-listing/PatientListing'

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
  {
    path: '/add-patient',
    element: (
      <MainLayout>
        <PatientOnboarding />
      </MainLayout>
    ),
    protected: true,
  },
  {
    path: '/patient-listing',
    element: (
      <MainLayout>
        <PatientListing />
      </MainLayout>
    ),
    protected: true,
  },
]
