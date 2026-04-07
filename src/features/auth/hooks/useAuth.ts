import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import * as AuthService from '../services/AuthService'
import type { LoginCredentials, RegisterCredentials } from '../types/auth.types'

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = AuthService.onAuthChange((user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [setUser, setLoading])

  const login = async (credentials: LoginCredentials) => {
    try {
      return await AuthService.login(credentials)
    } catch (error) {
      throw error
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      return await AuthService.register(credentials)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      throw error
    }
  }

  return { user, isAuthenticated, isLoading, login, register, logout }
}
