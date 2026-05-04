import { render, screen } from '@/test/test-utils'
import { CustomBudgetDashboard } from './CustomBudgetDashboard'
import { useAuthStore } from '@/store/authStore'
import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('Integración: Panel de Presupuesto', () => {
  
  beforeEach(() => {
    // Simulamos el estado de autenticación antes de cada test
    useAuthStore.setState({ 
      user: { 
        uid: 'user-123', 
        email: 'test@fintech.com', 
        displayName: 'Gerardo Dev' 
      }, 
      isAuthenticated: true 
    })
  })

  it('debe permitir crear una nueva sección y visualizarla', async () => {
    const user = userEvent.setup()
    render(<CustomBudgetDashboard />)

    // 1. Esperamos el botón principal (usa findBy porque puede haber un loading inicial)
    const botonAgregar = await screen.findByRole('button', { name: /agregar sección/i })
    await user.click(botonAgregar)

    // 2. Buscamos el item del menú.
    // Como quitaste el aria-label, ahora buscamos por el texto que genera el .map()
    // La regex /simple/i ignorará el emoji y las mayúsculas.
    const opcionSimple = await screen.findByRole('menuitem', { 
      name: /simple/i 
    })
    
    await user.click(opcionSimple)

    // 3. Verificamos que aparezca la nueva sección en el dashboard
    // Usamos findByText porque la sección aparece después de actualizar el estado de Zustand
    const tituloSeccion = await screen.findByText(/nueva sección/i)
    expect(tituloSeccion).toBeInTheDocument()

    // Opcional: Verificar que el contenedor de la sección existe
    // expect(screen.getByText(/disponible/i)).toBeInTheDocument()
  })
})