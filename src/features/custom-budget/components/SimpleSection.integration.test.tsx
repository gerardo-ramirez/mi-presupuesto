 import { useState } from 'react'
  import { render, screen } from '@/test/test-utils'
  import userEvent from '@testing-library/user-event'
  import { describe, it, expect } from 'vitest'
  import { SimpleSection } from './SimpleSection'
  import type { CustomSection, Expense, SectionCalculations } from '../types/customBudget.types'

  // Wrapper con estado real — replica exactamente lo que haría useCustomBudget
  // sin necesitar Firestore ni Firebase
  function SimpleSectionHarness({ section: initial }: { section: CustomSection }) {
    const [section, setSection] = useState(initial)

    const totalGastado = section.expenses.reduce((acc, e) => acc + e.monto, 0)
    const calculations: SectionCalculations = {
      totalGastado,
      disponible: section.totalAmount - totalGastado,
    }

    return (
      <SimpleSection
        section={section}
        calculations={calculations}
        onUpdate={(updates) => setSection((prev) => ({ ...prev, ...updates }))}
        onAddExpense={(monto, nombre) => {
          const expense: Expense = { id: `exp-${Date.now()}`, monto, nombre }
          setSection((prev) => ({ ...prev, expenses: [...prev.expenses, expense] }))
        }}
        onRemoveExpense={(id) =>
          setSection((prev) => ({ ...prev, expenses: prev.expenses.filter((e) => e.id !== id) }))
        }
        onRemove={() => {}}
        onComplete={() => {}}
      />
    )
  }

  const SECTION_VACÍA: CustomSection = {
    id: 's-1',
    title: 'Supermercado',
    icon: '🛒',
    order: 0,
    type: 'simple',
    completed: false,
    totalAmount: 50_000,
    expenses: [],
    divisions: [],
  }

  describe('SimpleSection — Flujo: agregar un gasto', () => {
    it('muestra el gasto en la lista y actualiza Gastado/Disponible', async () => {
      const user = userEvent.setup()
      render(<SimpleSectionHarness section={SECTION_VACÍA} />)

      // Estado inicial: sin gastos
      expect(screen.getByText('Sin gastos')).toBeInTheDocument()

      // Interacción: el usuario llena el formulario
      await user.type(screen.getByPlaceholderText('Agregá un gasto'), 'Carnes')
      await user.type(screen.getByPlaceholderText('Monto'), '15000')
      await user.click(screen.getByRole('button', { name: '+' }))

      // El gasto aparece en ExpenseList
      expect(screen.getByText('Carnes')).toBeInTheDocument()
      expect(screen.queryByText('Sin gastos')).not.toBeInTheDocument()

      // Los cálculos se actualizaron en SimpleSection (pipeline completo)
      const rowGastado = screen.getByText('Gastado').closest('div')!
      const rowDisponible = screen.getByText('Disponible').closest('div')!
      expect(rowGastado).toHaveTextContent(/15/)     // 15.000 o 15,000 según locale
      expect(rowDisponible).toHaveTextContent(/35/)  // 35.000 o 35,000 según locale
    })

    it('no agrega el gasto si el monto es 0 (regla de negocio en handleSubmit)', async () => {
      const user = userEvent.setup()
      render(<SimpleSectionHarness section={SECTION_VACÍA} />)

      await user.type(screen.getByPlaceholderText('Monto'), '0')
      await user.click(screen.getByRole('button', { name: '+' }))

      // La regla `parsed <= 0` en AddExpenseForm.tsx:18 debe haberse ejecutado
      expect(screen.getByText('Sin gastos')).toBeInTheDocument()
    })

    it('limpia el formulario después de agregar correctamente', async () => {
      const user = userEvent.setup()
      render(<SimpleSectionHarness section={SECTION_VACÍA} />)

      const inputMonto = screen.getByPlaceholderText('Monto')
      await user.type(inputMonto, '5000')
      await user.click(screen.getByRole('button', { name: '+' }))

      expect(inputMonto).toHaveValue('')
    })
  })