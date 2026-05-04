import { describe, it, expect } from 'vitest'
import { CustomBudgetAdapter } from './CustomBudgetAdapter'
import { DEFAULT_CUSTOM_BUDGET } from '../schemas/customBudget.schemas'

describe('CustomBudgetAdapter', () => {
  
  it('debe devolver los datos intactos si el esquema es válido', () => {
    // Datos crudos que simulan venir de Firestore
    const rawData = {
      currencyName: 'PESOS',
      currencyValue: 1000,
      sections: []
    }

    const result = CustomBudgetAdapter.fromFirestore(rawData)

    expect(result.currencyName).toBe('PESOS')
    expect(result.sections).toEqual([])
  })

  it('debe devolver DEFAULT_CUSTOM_BUDGET si los datos están corruptos', () => {
    // Simulamos datos inválidos (currencyValue es string en vez de number)
    const corruptedData = {
      currencyName: 'DÓLAR',
      currencyValue: 'MIL PESOS', // Error aquí
      sections: 'no soy un array' // Error aquí
    }

    const result = CustomBudgetAdapter.fromFirestore(corruptedData)

    // El adaptador debe detectar el fallo de Zod y devolver el fallback
    expect(result).toEqual(DEFAULT_CUSTOM_BUDGET)
  })
})