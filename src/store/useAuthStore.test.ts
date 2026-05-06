import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './authStore'


describe('useAuthStore', () => {
  // 1. EL RESET: Vital para evitar la "contaminación" entre tests.
  // Como tu store no tiene un método .reset(), lo hacemos manualmente.
  beforeEach(() => {
    useAuthStore.setState({ 
      user: null, 
      isLoading: true, 
      isAuthenticated: false 
    })
  })

  it('debe iniciar con los valores por defecto', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isLoading).toBe(true)
    expect(state.isAuthenticated).toBe(false)
  })

  it('setUser debe actualizar el usuario y marcar como autenticado', () => {
    const mockUser = { uid: '123', email: 'test@dev.com', displayName: 'Gerardo' }
    
    // Accionamos
    useAuthStore.getState().setUser(mockUser)

    // Verificamos el cambio de estado
    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
  })

  it('clearUser debe limpiar los datos y desautenticar', () => {
    // Primero "ensuciamos" el estado
    useAuthStore.setState({ isAuthenticated: true, user: { uid: '1' } as any })

    // Ejecutamos la acción de limpieza
    useAuthStore.getState().clearUser()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

    it('setUser(null) debe desautenticar aunque no se llame a clearUser (simula expiración de sesión Firebase)', () => {
    // Arrange: simulamos sesión activa
    useAuthStore.setState({
      user: { uid: 'u-1', email: 'g@dev.com', displayName: 'Gerardo' },
      isAuthenticated: true,
    })

    // Act: Firebase llama a onAuthStateChanged con null al expirar el token
    useAuthStore.getState().setUser(null)

    // Assert: la regla de negocio — isAuthenticated SIEMPRE === (user !== null)
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })
})