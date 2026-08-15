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

  it('en una sección checklist, solo los gastos marcados como done cuentan', () => {
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
    expect(result.current.disponible).toBe(80000)
  })
})
