import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { AdminRoute } from './AdminRoute'
import { MainLayout } from '@/components/layout/MainLayout'
import Loading from '@/components/shared/Loading'

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const BudgetPage = lazy(() => import('@/pages/BudgetPage'))
const CustomBudgetPage = lazy(() => import('@/pages/CustomBudgetPage'))

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
          <AdminRoute
            fallback={
              <Suspense fallback={<Loading />}>
                <CustomBudgetPage />
              </Suspense>
            }
          >
            <Suspense fallback={<Loading />}>
              <BudgetPage />
            </Suspense>
          </AdminRoute>
        ),
      },
      {
        path: 'custom',
        element: (
          <AdminRoute fallback={<Navigate to="/" replace />}>
            <Suspense fallback={<Loading />}>
              <CustomBudgetPage />
            </Suspense>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
