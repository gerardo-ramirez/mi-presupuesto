import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { MainLayout } from '@/components/layout/MainLayout'
import Loading from '@/components/shared/Loading'

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const BudgetPage = lazy(() => import('@/pages/BudgetPage'))

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Suspense fallback={<Loading />}><LoginPage /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<Loading />}><RegisterPage /></Suspense>} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Suspense fallback={<Loading />}><BudgetPage /></Suspense>} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
