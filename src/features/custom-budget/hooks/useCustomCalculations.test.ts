import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCustomCalculations } from './useCustomCalculations'
import type { CustomSection } from '../types/customBudget.types'

const baseSection: CustomSection = {
  id: 'sec-1',
  title: 'Test',
  icon: '💰',
  order: 0,
  type: 'simple',
  totalAmount: 100000,
  expenses: [],
  separators: [],
}

describe('useCustomCalculations', () => {
  it('en una sección simple, los separadores nunca afectan Gastado/Disponible', () => {
    const section: CustomSection = {
      ...baseSection,
      expenses: [{ id: 'e1', monto: 20000 }, { id: 'e2', monto: 5000 }],
      separators: [{ id: 's1', label: 'A partir de acá, super', order: 1 }],
    }

    const { result } = renderHook(() => useCustomCalculations(section, 1000))

    expect(result.current.totalGastado).toBe(25000)
    expect(result.current.disponible).toBe(75000)
  })

  it('en checklist, Gastado suma solo los done y Disponible suma solo los pendientes', () => {
    const section: CustomSection = {
      ...baseSection,
      type: 'checklist',
      expenses: [
        { id: 'e1', monto: 20000, done: true },
        { id: 'e2', monto: 5000, done: false },
      ],
    }

    const { result } = renderHook(() => useCustomCalculations(section, 1000))

    expect(result.current.totalGastado).toBe(20000)
    expect(result.current.disponible).toBe(5000)
  })

  it('en checklist, Disponible sube al agregar y baja al marcar como hecho', () => {
    const withOnePending: CustomSection = {
      ...baseSection,
      type: 'checklist',
      expenses: [{ id: 'e1', monto: 10000, done: false }],
    }
    const { result: r1 } = renderHook(() => useCustomCalculations(withOnePending, 1000))
    expect(r1.current.disponible).toBe(10000)

    const afterAdding: CustomSection = {
      ...withOnePending,
      expenses: [...withOnePending.expenses, { id: 'e2', monto: 7000, done: false }],
    }
    const { result: r2 } = renderHook(() => useCustomCalculations(afterAdding, 1000))
    expect(r2.current.disponible).toBe(17000) // sube al agregar

    const afterMarkingDone: CustomSection = {
      ...afterAdding,
      expenses: afterAdding.expenses.map((e) => (e.id === 'e1' ? { ...e, done: true } : e)),
    }
    const { result: r3 } = renderHook(() => useCustomCalculations(afterMarkingDone, 1000))
    expect(r3.current.disponible).toBe(7000) // baja al marcar como listo
    expect(r3.current.totalGastado).toBe(10000)
  })
})
