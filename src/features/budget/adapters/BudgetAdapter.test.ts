import { describe, it, expect } from 'vitest'
  import { BudgetAdapter } from './BudgetAdapter'
  import { DEFAULT_BUDGET } from '../schemas/budget.schemas'

  describe('BudgetAdapter.fromFirestore', () => {
    it('preserva los campos numéricos válidos del documento de Firestore', () => {
      const doc = { ...DEFAULT_BUDGET, brubank: 200_000, precioDolar: 1500 }

      const result = BudgetAdapter.fromFirestore(doc as Record<string, unknown>)

      expect(result.brubank).toBe(200_000)
      expect(result.precioDolar).toBe(1500)
    })

    it('retorna DEFAULT_BUDGET si un campo numérico llegó como string (corrupción de Firestore)', () => {
      const doc = { ...DEFAULT_BUDGET, brubank: 'ciento-cuatro-mil' }

      const result = BudgetAdapter.fromFirestore(doc as Record<string, unknown>)

      expect(result).toEqual(DEFAULT_BUDGET)
    })

    it('retorna DEFAULT_BUDGET si elementosComprados tiene un nombre con emoji (viola SAFE_TEXT)', () => {
      // Este es el caso más silencioso: datos válidos en el 95% de los campos,
      // pero un emoji en "nombre" hace fallar la validación Zod completa.
      const doc = {
        ...DEFAULT_BUDGET,
        elementosComprados: [{ id: 'e-1', nombre: '🎮 Juego', monto: 5000 }],
      }

      const result = BudgetAdapter.fromFirestore(doc as Record<string, unknown>)

      expect(result).toEqual(DEFAULT_BUDGET)
    })
  })