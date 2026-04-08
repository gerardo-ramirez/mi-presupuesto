import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { MainLayout } from '@/components/layout/MainLayout'
import Loading from '@/components/shared/Loading'

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const BudgetPage = lazy(() => import('@/pages/BudgetPage'))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Suspense fallback={<Loading />}>
          <RegisterPage />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <BudgetPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
